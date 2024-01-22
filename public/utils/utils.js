const onLoad = async () => {
  try {
    const validateResp = await axios.get("http://localhost:3000/me");

    if (validateResp.data.name != "JsonWebTokenError") {
      avatarNombre.textContent = validateResp.data.nombre;
      avatarEmail.textContent = validateResp.data.email;
    } else {
      window.location.href = "http://localhost:3000/login.html";
    }
  } catch (error) {
    console.error(error);
  }
};

const redirect = (ref) => {
  window.location.href = ref;
};

export { onLoad, redirect };
