export const ApiResponse = Object.freeze({
  success(data) {
    return { success: true, data };
  },
  error(message) {
    return { success: false, message };
  }
});
