import { create } from "zustand";

const DEFAULT_MESSAGE_ARRAY: any[] = [];
const useRoom = create((set: any) => ({
    selectedRoom: null,
    setSelectedRoom: (selectedRoom: any) => set({ selectedRoom }),
}));

export default useRoom;
