export const handleFirebaseAuthError = (error: any) => {
  switch (error.code) {
    case "auth/invalid-email":
      return "El correo electrónico ingresado no es válido.";
    case "auth/user-not-found":
      return "No se encuentra un usuario con ese correo.";
    case "auth/wrong-password":
      return "La contraseña es incorrecta.";
    case "auth/too-many-requests":
      return "Demasiados intentos. Intente nuevamente más tarde.";
    default:
      return "Error desconocido. Por favor, intente nuevamente.";
  }
};
