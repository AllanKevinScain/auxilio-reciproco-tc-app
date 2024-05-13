import { GranteesType } from "../generic";

export interface DefaultModalsInterface {
  isOpen: boolean;
  onClose: () => void;
}

export interface SuccessModalInterface extends DefaultModalsInterface {
  message?: string;
}

export interface DeleteModalInterface extends DefaultModalsInterface {
  message?: string;
  onNext: () => void;
}

export interface EditModalInterface extends DefaultModalsInterface {
  initialValues: GranteesType;
}
