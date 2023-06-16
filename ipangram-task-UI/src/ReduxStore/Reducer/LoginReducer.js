const initialData = {
  list: [],
};

const LoginReducer = (state = initialData, action) => {
  switch (action.type) {
    case "ADD_USER":
      // console.log("action.payload"+action.payload.loginId)
      const { id, name, token, email, userType } = action.payload;
      return {
        ...state,
        // list: [...state.list, { loginId: loginId, password: password }]
        list: [
          {
            id: id,
            name: name,
            email: email,
            userType: userType,
            token: token,
          },
        ],
      };

    case "DEL_USER":
      return {
        ...state,
        list: [],
      };

    default:
      return state;
  }
};

export default LoginReducer;
