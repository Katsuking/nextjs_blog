"use client"

// resendから送られてくるtokenがurlにあるので
// urlのトークンをuseSearchPramsを使って取り出す
// そのトークンを使って、server actionで処理を行い
// server actionの返り値を使って、ページを更新する

import { BeatLoader } from "react-spinners"
import { CardWrapper } from "./card-wrapper"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { newVerification } from "@/actions/new-verification"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"

export const NewVerificationForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token")
  console.log(token);

  const [error, setError] = useState<string | undefined>("");
  const [success, setSucess] = useState<string | undefined>("");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing token");
      return;
    }
    // verificationの認証を行うserver actions
    newVerification(token)
      .then((data) => {
        setSucess(data.success);
        setError(data.error)
      })
      .catch(() => {
        setError("Something went wrong")
      })
  }, [token, success, error])

  // useEffectは開発環境では2回実行される
  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <CardWrapper
      headerLabel="Confirm your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && (
          <BeatLoader />
        )}
        <FormSuccess message={success} />
        {!success && (
          <FormError message={error} />
        )}
      </div>
    </CardWrapper>
  )
}

