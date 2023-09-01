export const registerNewUser = async (formData) => {
  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const newUserData = await response.json();

    return newUserData;
  } catch (error) {
    console.log("Registration Error", error);
  }
};
