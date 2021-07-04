export interface IModalState {
    isModalOpen: boolean,
    onClose: (isOpened: boolean) => void
    className?: string
}