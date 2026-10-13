export interface Action_State_interface {
  success: boolean;
  error?: unknown;
}

export const action_init_state: Action_State_interface = {
  success: true,
  error: null,
};

export interface Action_Interface {
  state: Action_State_interface;
  formdata: FormData;
}
