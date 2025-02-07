import { create } from 'zustand'

const useStore = create((set) => ({
  isOpen: false,
  type: "transfer",
  isSuccessful: false,
  openPopup: (popupType) => set({ isOpen: true, type: popupType }),
  closePopup: () => set({ isOpen: false, type: "" }),
  setSuccessful: (val) => set({ isSuccessful: val }),
}))

export default useStore