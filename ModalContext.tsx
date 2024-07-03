import React, { createContext, useState, ReactNode, FC, useContext } from 'react';

type IModal = {
    id: string;
    content: ReactNode;
    isVisible: boolean;
};

type IContextType = {
    modals: IModal[];
    addModal: (modal: IModal) => void;
    closeModal: (id: string) => void;
};

const ModalContext = createContext<IContextType | undefined>(undefined);

export const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [modals, setModals] = useState<IModal[]>([]);

    const addModal = (modal: IModal) => {
        setModals([...modals, modal]);
    };

    const closeModal = (id: string) => {
        setModals(modals.filter(modal => modal.id !== id));
    };

    return (
        <ModalContext.Provider value={{ modals, addModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = (): IContextType => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('something want wrong');
    }
    return context;
};
