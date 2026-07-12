import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, collection, getDocs, addDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';
import { Resource, Message, WebsiteConfig, Program, Teacher } from '../types';
import { defaultWebsiteConfig, defaultResources, defaultPrograms, defaultTeachers } from '../data/defaultData';

// Initialize Firebase
let app;
let db: any;
let auth: any;

try {
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
  db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
  auth = getAuth(app);
} catch (error) {
  console.error('Firebase initialization failed. Falling back to offline client.', error);
}

export { db, auth };

// Operation types for custom error details
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

// Custom error info structure conforming to firebase-integration skill
export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

// Global firestore error handling routine
export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth?.currentUser?.uid || null,
      email: auth?.currentUser?.email || null,
      emailVerified: auth?.currentUser?.emailVerified || null,
      isAnonymous: auth?.currentUser?.isAnonymous || null,
      tenantId: auth?.currentUser?.tenantId || null,
      providerInfo: auth?.currentUser?.providerData?.map((provider: any) => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  const stringified = JSON.stringify(errInfo);
  console.error('Firestore Error: ', stringified);
  throw new Error(stringified);
}

// Fetch site configuration (WebsiteConfig)
export async function getWebsiteConfig(): Promise<WebsiteConfig> {
  if (!db) return defaultWebsiteConfig;
  try {
    const docRef = doc(db, 'config', 'settings');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      // Self-healing check: if the stored config is an older placeholder/default,
      // return the latest approved institute content and contact details.
      const hasLegacyDefaultConfig =
        data.whatsappNumber === '212600000000' ||
        data.whatsappNumber === '966501234567' ||
        !data.phone ||
        data.phone.includes('+212') ||
        data.phone.includes('+966 50 123 4567') ||
        data.regionsServedAr?.includes('الجاليات المسلمة') ||
        data.valuesAr?.some((value: string) => value.includes('فهم سلف الأمة'));

      if (hasLegacyDefaultConfig) {
        if (auth?.currentUser) {
          try {
            await setDoc(docRef, defaultWebsiteConfig);
          } catch (writeError) {
            handleFirestoreError(writeError, OperationType.WRITE, 'config/settings');
          }
        }
        return defaultWebsiteConfig;
      }
      return { ...defaultWebsiteConfig, ...data } as WebsiteConfig;
    } else {
      // Seed with default config ONLY if we have an authenticated user to perform the write
      if (auth?.currentUser) {
        try {
          await setDoc(docRef, defaultWebsiteConfig);
        } catch (writeError) {
          handleFirestoreError(writeError, OperationType.WRITE, 'config/settings');
        }
      }
      return defaultWebsiteConfig;
    }
  } catch (error) {
    try {
      handleFirestoreError(error, OperationType.GET, 'config/settings');
    } catch (e) {
      // Intentionally swallowed after logging inside handleFirestoreError to return default fallback
    }
    return defaultWebsiteConfig;
  }
}

// Update site configuration
export async function updateWebsiteConfig(config: WebsiteConfig): Promise<void> {
  if (!db) throw new Error('Database is offline');
  try {
    const docRef = doc(db, 'config', 'settings');
    await setDoc(docRef, config);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'config/settings');
  }
}

// Fetch resources (public library)
export async function getResources(): Promise<Resource[]> {
  if (!db) return defaultResources;
  try {
    const colRef = collection(db, 'resources');
    const snapshot = await getDocs(colRef);
    const resourcesList: Resource[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      resourcesList.push({ id: doc.id, ...data } as Resource);
    });
    
    if (resourcesList.length === 0) {
      // Seed with default resources ONLY if we have an authenticated user to perform the write
      if (auth?.currentUser) {
        try {
          for (const res of defaultResources) {
            await setDoc(doc(db, 'resources', res.id), res);
          }
        } catch (writeError) {
          handleFirestoreError(writeError, OperationType.WRITE, 'resources');
        }
      }
      return defaultResources;
    }
    
    // Sort by createdAt descending
    return resourcesList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    try {
      handleFirestoreError(error, OperationType.LIST, 'resources');
    } catch (e) {
      // Intentionally swallowed after logging inside handleFirestoreError to return default fallback
    }
    return defaultResources;
  }
}

// Create or update a resource
export async function saveResource(resource: Resource): Promise<void> {
  if (!db) throw new Error('Database is offline');
  try {
    const docRef = doc(db, 'resources', resource.id);
    await setDoc(docRef, resource);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `resources/${resource.id}`);
  }
}

// Delete a resource
export async function deleteResource(id: string): Promise<void> {
  if (!db) throw new Error('Database is offline');
  try {
    const docRef = doc(db, 'resources', id);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `resources/${id}`);
  }
}

// Submit contact form message
export async function submitContactMessage(message: Omit<Message, 'id' | 'createdAt'>): Promise<string> {
  const id = 'msg_' + Math.random().toString(36).substr(2, 9);
  const createdAt = new Date().toISOString();
  const fullMessage: Message = { id, ...message, createdAt };
  
  if (!db) {
    // If database is offline, save to local storage
    const messages = JSON.parse(localStorage.getItem('local_messages') || '[]');
    messages.push(fullMessage);
    localStorage.setItem('local_messages', JSON.stringify(messages));
    return id;
  }
  
  try {
    await setDoc(doc(db, 'messages', id), fullMessage);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `messages/${id}`);
  }
  return id;
}

// Fetch messages (admin only)
export async function getContactMessages(): Promise<Message[]> {
  if (!db) {
    return JSON.parse(localStorage.getItem('local_messages') || '[]');
  }
  try {
    const colRef = collection(db, 'messages');
    const snapshot = await getDocs(colRef);
    const list: Message[] = [];
    snapshot.forEach((doc) => {
      list.push(doc.data() as Message);
    });
    // Sort by createdAt descending
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    try {
      handleFirestoreError(error, OperationType.LIST, 'messages');
    } catch (e) {
      // Intentionally swallowed after logging inside handleFirestoreError to return default fallback
    }
    return JSON.parse(localStorage.getItem('local_messages') || '[]');
  }
}

// Delete a message (admin only)
export async function deleteContactMessage(id: string): Promise<void> {
  if (!db) {
    const messages = JSON.parse(localStorage.getItem('local_messages') || '[]');
    const filtered = messages.filter((m: Message) => m.id !== id);
    localStorage.setItem('local_messages', JSON.stringify(filtered));
    return;
  }
  try {
    const docRef = doc(db, 'messages', id);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `messages/${id}`);
  }
}

// Fetch programs (public / editable by admin)
export async function getPrograms(): Promise<Program[]> {
  if (!db) return defaultPrograms;
  try {
    const colRef = collection(db, 'programs');
    const snapshot = await getDocs(colRef);
    const list: Program[] = [];
    snapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() } as Program);
    });

    const hasLegacyProgramContent =
      list.some(p => p.detailsAr?.some(detail => detail.includes('ورش عن نافع'))) ||
      list.some(p => p.titleAr === 'العلوم الشرعية' && !p.detailsAr?.some(detail => detail.includes('علوم القرآن'))) ||
      list.some(p => p.titleAr === 'دبلوم العلوم الشرعية التأسيسي');

    // Self-healing check: if database has older placeholder content, fallback and seed the latest defaults.
    if (list.length === 0 || list.length === 3 || hasLegacyProgramContent) {
      // Seed default programs ONLY if we have an authenticated user to perform the write
      if (auth?.currentUser) {
        try {
          for (const prog of defaultPrograms) {
            await setDoc(doc(db, 'programs', prog.id), prog);
          }
        } catch (writeError) {
          handleFirestoreError(writeError, OperationType.WRITE, 'programs');
        }
      }
      return defaultPrograms;
    }
    return list;
  } catch (error) {
    try {
      handleFirestoreError(error, OperationType.LIST, 'programs');
    } catch (e) {
      // Intentionally swallowed after logging inside handleFirestoreError to return default fallback
    }
    return defaultPrograms;
  }
}

// Save or update program
export async function saveProgram(program: Program): Promise<void> {
  if (!db) throw new Error('Database is offline');
  try {
    const docRef = doc(db, 'programs', program.id);
    await setDoc(docRef, program);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `programs/${program.id}`);
  }
}

// Delete program
export async function deleteProgram(id: string): Promise<void> {
  if (!db) throw new Error('Database is offline');
  try {
    const docRef = doc(db, 'programs', id);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `programs/${id}`);
  }
}

// Fetch teachers (public / editable by admin)
export async function getTeachers(): Promise<Teacher[]> {
  if (!db) return defaultTeachers;
  try {
    const colRef = collection(db, 'teachers');
    const snapshot = await getDocs(colRef);
    const list: Teacher[] = [];
    snapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() } as Teacher);
    });

    const hasLegacyTeacherContent = list.some(t =>
      t.nameAr === 'الشيخ الأكاديمي المشرف' ||
      t.nameAr === 'الشيخ الدكتور عبد الرحمن التونسي' ||
      t.nameAr?.includes('عبد الرحمن التونسي') ||
      t.bioAr?.includes('حاصل على شهادة الدكتوراه') ||
      t.id === 't2' ||
      t.id === 't3'
    );

    // Self-healing check: if database has older placeholder teachers, fallback and seed the latest founder profile.
    if (list.length === 0 || list.length === 3 || hasLegacyTeacherContent) {
      // Seed default teachers ONLY if we have an authenticated user to perform the write
      if (auth?.currentUser) {
        try {
          // Clear any existing old documents (like t1, t2, t3 if they exist)
          for (const oldId of ['t1', 't2', 't3']) {
            await deleteDoc(doc(db, 'teachers', oldId));
          }
          for (const teach of defaultTeachers) {
            await setDoc(doc(db, 'teachers', teach.id), teach);
          }
        } catch (writeError) {
          handleFirestoreError(writeError, OperationType.WRITE, 'teachers');
        }
      }
      return defaultTeachers;
    }
    return list;
  } catch (error) {
    try {
      handleFirestoreError(error, OperationType.LIST, 'teachers');
    } catch (e) {
      // Intentionally swallowed after logging inside handleFirestoreError to return default fallback
    }
    return defaultTeachers;
  }
}

// Save or update teacher
export async function saveTeacher(teacher: Teacher): Promise<void> {
  if (!db) throw new Error('Database is offline');
  try {
    const docRef = doc(db, 'teachers', teacher.id);
    await setDoc(docRef, teacher);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `teachers/${teacher.id}`);
  }
}

// Delete teacher
export async function deleteTeacher(id: string): Promise<void> {
  if (!db) throw new Error('Database is offline');
  try {
    const docRef = doc(db, 'teachers', id);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `teachers/${id}`);
  }
}