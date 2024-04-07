import { create } from "zustand";

const DEFAULT_MESSAGE_ARRAY: any[] = [];
const useRoom = create((set: any) => ({
    selectedRoom: null,
    setSelectedRoom: (selectedRoom: any) => set({ selectedRoom }),
    messages: DEFAULT_MESSAGE_ARRAY,
    setMessages: (messages: any) => set({ messages }),
}));

export default useRoom;
