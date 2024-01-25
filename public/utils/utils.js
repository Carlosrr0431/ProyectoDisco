const onLoad = async () => {
  try {
    const validateResp = await axios.get("https://plataformadiscopledu.onrender.com/me");

    if (validateResp.data.name != "JsonWebTokenError") {
      avatarNombre.textContent = validateResp.data.nombre;
      avatarEmail.textContent = validateResp.data.email;
    } else {
      window.location.href = "https://plataformadiscopledu.onrender.com/login";
    }
  } catch (error) {
    console.error(error);
  }
};

const redirect = (ref) => {
  window.location.href = ref;
};

export { onLoad, redirect };
