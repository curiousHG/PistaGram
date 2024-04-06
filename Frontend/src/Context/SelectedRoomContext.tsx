import { create } from "zustand";

const useRoom = create((set) => ({
    selectedRoom: null,
    setSelectedRoom: (selectedRoom: any) => set({ selectedRoom }),
    messages: [],
    setMesssages: (messages: any) => set({ messages }),
}));

export default useRoom;
