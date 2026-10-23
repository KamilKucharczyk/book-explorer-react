import useForm from "../hooks/useForm";

const Profile = () => {
  const savedProfile = localStorage.getItem("profile");
  const initialValues = savedProfile
    ? JSON.parse(savedProfile)
    : {
        username: "",
        email: "",
        favoriteGenre: "",
        yearlyGoal: "",
      };

  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Username is required";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!values.email.includes("@")) {
      errors.email = "@ is required";
    }

    if (!values.favoriteGenre) {
      errors.favoriteGenre = "Favorite genre is required";
    }

    if (!values.yearlyGoal) {
      errors.yearlyGoal = "Yearly goal is required";
    } else if (Number(values.yearlyGoal) <= 0) {
      errors.yearlyGoal = "Yearly goal at least 1";
    }
    return errors;
  };

  const onSubmit = (values) => {
    localStorage.setItem("profile", JSON.stringify(values));
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    initialValues,
    validate,
    onSubmit,
  );

  return (
    <div>
      <h1>Profile page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={values.username}
          onChange={handleChange}
          placeholder="username"
        />
        {errors.username && <p>{errors.username}</p>}
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="email"
        />
        {errors.email && <p>{errors.email}</p>}
        <input
          type="text"
          name="favoriteGenre"
          value={values.favoriteGenre}
          onChange={handleChange}
          placeholder="favoriteGenre"
        />
        {errors.favoriteGenre && <p>{errors.favoriteGenre}</p>}
        <input
          type="number"
          name="yearlyGoal"
          value={values.yearlyGoal}
          onChange={handleChange}
          placeholder="yearlyGoal"
        />
        {errors.yearlyGoal && <p>{errors.yearlyGoal}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default Profile;
