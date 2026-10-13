import { Action_State_interface } from ".";

export default async function DemoAction(
  state: Action_State_interface,
  formdata: FormData,
): Promise<Action_State_interface> {
  try {
    const name = formdata.get("name");

    if (!name)
      return {
        ...state,
        success: false,
        error: {
          name: "ไม่พบชื่อ",
        },
      };

    return {
      ...state,
      success: true,
      error: null,
    };
  } catch (error) {
    return {
      ...state,
      success: false,
      error,
    };
  }
}
