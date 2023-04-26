import * as Yup from "yup";

export const schemaForm2_1 = Yup.object().shape({
  AutorKryesor: Yup.mixed().required("Autori kryesor duhet të plotësohet"),
  AutoretKorrespodent: Yup.mixed().required(
    "Autorët përkatës duhet të plotësohen"
  ),
  BashkeAutoret: Yup.mixed().required("Bashkautorët duhet të plotësohen"),
  KonfirmimiBashkeAutorve: Yup.mixed().required(
    "Konfirmimi i bashkautorëve duhet të plotësohet"
  ),
});

export const schemaForm3 = Yup.object().shape({
  CVPublikimeDoc: Yup.array()
    .min(
      2,
      "CV dhe Publikime janë të detyrueshme dhe duhet të ngarkohen të paktën 2 dokumente"
    )
    .required(),
  RekomandimiPerAplikimDoc: Yup.mixed().required(
    "Rekomandimi per aplikim is required"
  ),
  PershkrimiDetajuarProjektitDoc: Yup.mixed().required(
    "Pershkrimi Detajuar is required"
  ),
  PermbledhjeDoc: Yup.mixed().required("Permbledhje is required"),
  PershkrimiProjektitDoc: Yup.mixed().required(
    "Pershkrimi Projektit is required"
  ),
});

export const schemaForm4 = Yup.object().shape({
  Vendi: Yup.string()
    .min(2, "Vendi duhet të jetë i gjatë të paktën 3 karaktere")
    .required(),
});
