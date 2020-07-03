import React, { useState } from "react"

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers"
import * as yup from "yup"

import { IoIosArrowBack } from "react-icons/io"

// error span
import { Error } from "./ErrorComponent"

import "./styles.css"

import profile from "../../assets/profile_img.svg"
import avatar from "../../assets/avatar.svg"

// schema validation with yup
const schema = yup.object().shape({
  firstName: yup
    .string()
    .required()
    .min(3, "So short")
    .max(18, "Woow, so long! tell me just your first name")
    .notOneOf(["admin", "administrador"], "'-'"),
  lastName: yup
    .string()
    .required()
    .max(30)
    .notOneOf(["admin", "administrador"], "'-'"),
  city: yup.string().required().max(30),
  email: yup
    .string()
    .required("Email is required")
    .email("A valid email, please"),
})

const passwordschema = yup.object().shape({
  currentpassword: yup.string().required(),
  // .min(3, "So short") a min value
  // .max(18, "Woow, so long! tell me just your first name") a max value
  newpassword: yup.string().required(),
  confirmnewpassword: yup.string().required(),
})

export default function Profile() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [city, setCity] = useState("")
  const [email, setEmail] = useState("")

  const [password, setPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  })
  const {
    register: register2,
    errors: errors2,
    handleSubmit: handleSubmit2,
  } = useForm({
    resolver: yupResolver(passwordschema),
    mode: "onBlur",
  })

  const onSubmit = (data) => {
    try {
      setFirstName(data.firstName)
      setLastName(data.lastName)
      setCity(data.City)
      setEmail(data.Email)
    } catch (error) {
      alert(error)
    }
  }

  // Verify if new password match with the confirm input
  const onSubmitNewPassword = (data) => {
    if (data.newpassword !== data.confirmnewpassword) {
      alert("Both passwords are not matching")
    }
    if (data.confirmnewpassword === data.password) {
      alert("New password can not be similar to the previous one")
    } else {
      console.log(data)
    }
  }

  const getColorFromValidation = (newpass) => {
    if (newpass === newPassword) {
      return { color: "#252525" }
    }
    if (newpass !== newPassword) {
      return { color: "rgb(228, 71, 71)" }
    }
  }

  return (
    <container className="profile-container">
      <div className="img">
        <img src={profile} alt="svg" />
      </div>

      <section className="form-content">
        <IoIosArrowBack className="arrow-back" color="#252525" size={50} />
        <img src={avatar} alt="avatar" />

        {/* Profile form */}
        <form
          key={1}
          onSubmit={handleSubmit(onSubmit)}
          className="profile-form"
        >
          {/* register your input into the hook by invoking the "register" function */}
          <input
            name="firstName"
            placeholder="Your name"
            ref={register({ required: true })}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {errors.firstName && <Error>Name field is required</Error>}

          {/* include validation with required or other standard HTML validation rules */}
          <input
            name="lastName"
            placeholder="Last name"
            ref={register({ required: true })}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {/* errors will return when field validation fails  */}
          {errors.lastName && <Error>Last name field is required</Error>}

          <input
            name="city"
            placeholder="City - UF"
            ref={register({ required: true })}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          {/* errors will return when field validation fails  */}
          {errors.city && <Error>City is required</Error>}

          <input
            name="email"
            type="text"
            placeholder="Email"
            ref={register({ required: true })}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* errors will return when field validation fails  */}
          {errors.email && <Error>Email is required</Error>}

          <div className="btns">
            <button className="profile-save-btn" type="submit">
              Salvar Alterações
            </button>
          </div>
        </form>

        {/* ---------------------------------------------------- */}

        {/* Password form */}
        <form
          key={2}
          onSubmit={handleSubmit2(onSubmitNewPassword)}
          className="password-form"
        >
          <h5>Alterar Senha:</h5>

          <input
            name="currentpassword"
            type="password"
            autoComplete="new-password"
            placeholder="Senha atual"
            ref={register2({ required: true })}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* errors will return when field validation fails  */}
          {errors2.currentpassword && (
            <Error>Write your current password</Error>
          )}

          <input
            name="newpassword"
            type="password"
            autoComplete="new-password"
            placeholder="Nova senha"
            ref={register2({ required: true })}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {/* errors will return when field validation fails  */}
          {errors2.newpassword && <Error>Choose a new password</Error>}

          <input
            name="confirmnewpassword"
            placeholder="Confirmar nova senha"
            autoComplete="new-password"
            type="password"
            ref={register2({ required: true })}
            style={getColorFromValidation(confirmNewPassword)}
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
          {/* errors will return when field validation fails  */}
          {errors2.confirmnewpassword && (
            <Error>Confirm your new password</Error>
          )}
          <div className="btns">
            <button className="save-btn" type="submit">
              Alterar Senha
            </button>
          </div>
        </form>
      </section>
    </container>
  )
}
