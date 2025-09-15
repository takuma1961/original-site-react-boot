import React from "react";
import { useForm } from "react-hook-form";
import { sendForm } from "emailjs-com";
import styled from "styled-components";
import media from "assets/styles/media";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { PageTitle } from "components/atoms/PageTitle";
import Header from "../components/PortfolioHeader.jsx";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); //react-hook-formライブラリのuseFormから機能を取り出している

  const sendMail = (data, e) => {
    e.preventDefault(); //ページリロードを防ぐ
    sendForm(
      `${process.env.REACT_APP_SERVICE_ID}`,
      `${process.env.REACT_APP_TEMPLATE_ID}`,
      e.target,
      `${process.env.REACT_APP_USER_ID}`
    ).then(
      (response) => {
        console.log("SUCCESS!", Response.status, Response.text);
        window.alert("メールを送信しました。");
        e.target.reset();
      },
      (error) => {
        console.log("FAILED...", error);
        window.alert("送信に失敗しました。時間をおいて再度お試しください。");
      }
    );
  };

  return (
    <>
      <Header />
      <SComponentContainer>
        <PageTitle>CONTACT</PageTitle>
        <SText>
          お気軽に下記フォームより必須事項をご記入の上ご連絡ください。
        </SText>
        <form onSubmit={handleSubmit(sendMail)} id="contact-form">
          <STextField
            variant="filled"
            label="件名(必須)"
            type="text"
            fullWidth
            margin="normal"
            {...register("subject", { required: true })}
            error={Boolean(errors.subject)}
            helperText={errors.subject && "件名を入力してください"}
          />
          <STextField
            variant="filled"
            label="氏名(必須)"
            type="text"
            fullWidth
            margin="normal"
            {...register("name", { required: true })}
            error={Boolean(errors.name)}
            helperText={errors.name && "氏名を入力してください"}
          />
          <STextField
            variant="filled"
            label="返信用メールアドレス(必須)"
            type="email"
            fullWidth
            margin="normal"
            {...register("email", { required: true })}
            error={Boolean(errors.email)}
            helperText={errors.email && "メールアドレスを入力してください"}
          />

          <STextField
            variant="filled"
            label="お問い合わせ内容(必須)"
            type="text"
            fullWidth
            margin="normal"
            {...register("message", { required: true })}
            error={Boolean(errors.message)}
            helperText={errors.message && "お問い合わせ内容を入力して下さい。"}
            multiline
            rows={8}
          />
          <SButton variant="contained" color="inherit" type="submit">
            送信
          </SButton>
        </form>
      </SComponentContainer>
    </>
  );
};
export default Contact;

const SComponentContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 80vw;
  text-align: center;

  padding: 80px 0 0;
  ${media.lg`
    padding: 0 0 60px;
  `}
  ${media.md`
    padding: 10px 0 40px;
  `}
`;

const SText = styled.p`
  font-size: 16px;
  ${media.lg`
    font-size: 14px;
  `}
  ${media.md`
    font-size: 12px;
  `}
`;

const STextField = styled(TextField)`
  background-color: white;
  ::placeholder {
    color: gray;
  }
`;

const SButton = styled(Button)`
  margin-top: 10px;
  float: left;
`;
