import { create } from 'zustand';
import { collection, doc, setDoc, getDoc, deleteDoc, updateDoc, getDocs, writeBatch } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { auth } from './firebaseConfig';

export const useCartStore = create(set => ({
  isOpen: false,
  products: [],
  user: null,
  actions: {
    openCart: () => set({ isOpen: true }),
    closeCart: () => set({ isOpen: false }),
    addProduct: async product => {
      const user = auth.currentUser;
      if (user) {
        const productRef = doc(db, 'users', user.uid, 'cart', product.id);
        const docSnap = await getDoc(productRef);

        if (docSnap.exists()) {
          await updateDoc(productRef, {
            quantity: docSnap.data().quantity + 1
          });
        } else {
          await setDoc(productRef, {
            ...product,
            quantity: 1
          });
        }

        const cartProducts = await getCartProducts(user.uid);
        set({ products: cartProducts });
      } else {
        set(state => {
          const productIndex = state.products.findIndex(p => p.id === product.id);
          if (productIndex >= 0) {
            const updatedProducts = [...state.products];
            updatedProducts[productIndex].quantity += 1;
            return { products: updatedProducts };
          } else {
            return { products: [...state.products, { ...product, quantity: 1 }] };
          }
        });
      }
    },
    removeProduct: async productId => {
      const user = auth.currentUser;
      if (user) {
        const productRef = doc(db, 'users', user.uid, 'cart', productId);
        const docSnap = await getDoc(productRef);

        if (docSnap.exists() && docSnap.data().quantity > 1) {
          await updateDoc(productRef, {
            quantity: docSnap.data().quantity - 1
          });
        } else {
          await deleteDoc(productRef);
        }

        const cartProducts = await getCartProducts(user.uid);
        set({ products: cartProducts });
      } else {
        set(state => {
          const updatedProducts = state.products.map(p => {
            if (p.id === productId) {
              if (p.quantity > 1) {
                return { ...p, quantity: p.quantity - 1 };
              } else {
                return null;
              }
            }
            return p;
          }).filter(Boolean);
          return { products: updatedProducts };
        });
      }
    },
    loadCart: async () => {
      const user = auth.currentUser;
      if (user) {
        const cartProducts = await getCartProducts(user.uid);
        set({ products: cartProducts });
      }
    },
    clearCart: async () => {
      const user = auth.currentUser;
      if (user) {
        const cartRef = collection(db, 'users', user.uid, 'cart');
        const querySnapshot = await getDocs(cartRef);
        const batch = writeBatch(db);
        querySnapshot.forEach(doc => {
          batch.delete(doc.ref);
        });
        try {
          await batch.commit();
        } catch (error) {
          console.error('Error al vaciar el carrito en Firestore: ', error);
        }
      }
      set({ products: [] });
    },
    setUser: user => set({ user })
  },
}));

const getCartProducts = async userId => {
  const cartRef = collection(db, 'users', userId, 'cart');
  const querySnapshot = await getDocs(cartRef);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};