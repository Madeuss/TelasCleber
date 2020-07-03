import React, { useState } from "react"

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers"
import * as yup from "yup"

//error span
import { Error } from "./ErrorComponent"

import "./styles.css"

import { IoIosArrowBack } from "react-icons/io"

import wave from "../../assets/wave.png"
import opinion from "../../assets/opinion_img.svg"
import avatar from "../../assets/avatar.svg"

//schema validation with yup
const schema = yup.object().shape({
  message: yup.string().required("Don't be shy..."),
})

export default function Feedback() {
  const [message, setMessage] = useState("")

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  })

  const onSubmit = (data) => {
    try {
      setMessage(data.message)
    } catch (error) {
      alert(error)
    }
  }

  return (
    <container className="feedback-container">
      <img className="wave" src={wave} alt="wave" />
      <div className="img">
        <img src={opinion} alt="svg" />
      </div>

      <section className="form-content">
        <IoIosArrowBack className="arrow-back" color={"#252525"} size={50} />
        <img src={avatar} alt="avatar" />

        {/* Profile form */}
        <form className="feedback-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <input type="radio" name="feedback-opt" id="issue" />
            <label htmlFor="issue">Relatar um problema</label>
          </div>
          <div className="input-group">
            <input type="radio" name="feedback-opt" id="improvement" />
            <label htmlFor="improvement">Sugestão de melhorias</label>
          </div>
          <div className="input-group">
            <input type="radio" name="feedback-opt" id="questions" />
            <label htmlFor="questions">Dúvidas</label>
          </div>
          <div className="textarea-div">
            <label htmlFor="message">Escreva aqui a sua mensagem</label>
            <textarea
              name="message"
              className="feedback-message"
              ref={register({ required: true })}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            {errors.message && <Error>Write me your feedback message</Error>}
          </div>
          <div className="feed-btns">
            <button className="feedback-send-btn" type="submit">
              Acessar
            </button>
          </div>
        </form>
      </section>
    </container>
  )
}
