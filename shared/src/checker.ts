export async function check(id: string) {
  const authRes = await fetch(`https://egov.uscis.gov/csol-api/ui-auth/${id}`, {
    headers: {
      "content-type": "application/json",
    },
  })

  if (!authRes.ok) {
    throw new Error("bad auth res")
  }

  const authJson = (await authRes.json()) as {
    JwtResponse: { accessToken: string }
  }

  const checkRes = await fetch(
    `https://egov.uscis.gov/csol-api/case-statuses/${id}`,
    {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${authJson.JwtResponse.accessToken}`,
      },
    }
  )

  if (!checkRes.ok) {
    throw new Error("bad check res")
  }

  const checkJson = (await checkRes.json()) as {
    CaseStatusResponse: {
      detailsEng: {
        formNum: string
        formTitle: string
        actionCodeText: string
        actionCodeDesc: string
        empty: boolean
      }
    }
  }

  return checkJson.CaseStatusResponse.detailsEng
}
