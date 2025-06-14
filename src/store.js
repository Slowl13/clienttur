import { create } from "zustand";

export const userInfo = create((set) => ({
    token: undefined,
    name: undefined,
    isLoggin: false,
    userId: undefined,
    setToken: (token) => set((state) => ({ ...state, token })),
    setName: (name) => set((state) => ({ ...state, name })),
    setIsLoggin: () => set((state) => ({...state, isLoggin: !state.isLoggin})),
    setUserId: (userId) => set((state) => ({...state, userId}))
}))

export const dataStorage = create((set) => ({
    usersArray: [],
    newsArray: [],
    tursArray: [],
    clientsArray: [],
    setArray: (arrName, arrData) => set((state) => ({...state, [arrName]: arrData})),
    addNewData: (arrName, obj) => set((state) => ({...state, [arrName]: [...[arrName], obj]})) 
}))

export const navStorage = create((set) => ({
    navState: "main",
    setNavState: (navState) => set((state) => ({ ...state, navState }))
}))

export const tempIdStorage = create((set) => ({
    tempId: 0,
    setTempId: (tempId) => set((state) => ({ ...state, tempId}))
}))

export const filterStorage = create((set) => ({
    filterArr: [],
    setFilterArray: (arr) => set((state) => ({...state, ["filterArr"]:arr}))
}))

