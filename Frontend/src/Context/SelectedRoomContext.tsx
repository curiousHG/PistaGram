import { create } from "zustand";

const DEFAULT_ROOM: any = null;

const useRoom = create((set: any) => ({
    selectedRoom: DEFAULT_ROOM,
    setSelectedRoom: (selectedRoom: any) => set({ selectedRoom }),
}));

export default useRoom;
