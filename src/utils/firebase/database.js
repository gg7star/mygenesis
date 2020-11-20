import firebase from '@react-native-firebase/app'
import '@react-native-firebase/database'

const USER_TABLE_NAME = 'users'
const JOB_TABLE_NAME = 'jobs'
const FAVORITE_TABLE_NAME = 'favorites'
const APPLIED_TABLE_NAME = 'appliedJobs'
// const ADMIN_MESSAGE_TABLE_NAME = "adminMessages"
const AVAILABILITY_TABLE_NAME = "availability"
const CONTACT_US_TABLE_NAME = "contactUs"

export async function createAccount({ credential, signupInfo }) {
  const user = credential.user._user
  console.log("User Info: ", user)
  const { uid } = user
  console.log("SingupInfo inside function", signupInfo.civility)
  const { civility, firstName, lastName, zipCode, city, telephone, cvFirebasePath, cvFileName, job, activityArea } = signupInfo
  if (uid) {
    var userData = {
      uid,
      actived: true,
      signedUp: firebase.database.ServerValue.TIMESTAMP,
      lastLoggedIn: firebase.database.ServerValue.TIMESTAMP,
      civility,
      firstName,
      lastName,
      zipCode,
      city,
      telephone,
      cvFirebasePath,
      cvFileName,
      job,
      activityArea,
      ...user
    }
    console.log("User data to be pushed", userData)
    try {
      return firebase.database().ref(`${USER_TABLE_NAME}/${uid}`)
        .set(userData).then(() => {
          return { credential: userData, error: null }
        });
    } catch (e) {
      console.log('==== error: ', e)
      return { credential: null, error: e.code }
    }
  }
  console.log("User Info is null")
  return { credential: null, error: "No user data" }
}

export async function getUserInfo(uid) {
  return firebase.database()
    .ref(`${USER_TABLE_NAME}/${uid}`)
    .once('value')
    .then((snapshot) => {
      if (snapshot.exists) return snapshot.val()
      else return null;
    }
    )
}

export async function getCurrentUserId() {
  const uid = firebase.auth().currentUser.uid
  // const uid = "-MBC5lHoTRfthA545U7Y"
  return uid
}

export async function getCurrentUserInfo() {
  const uid = await getCurrentUserId()
  return getUserInfo(uid)
}

export function getDefaultAvailability() {
  let currentDate = new Date()
  return {
    "startDate": currentDate.toString(),
    "Lun": [false, false, false, false],
    "Mar": [true, false, false, false],
    "Mer": [false, false, false, false],
    "Jeu": [false, false, false, false],
    "Ven": [false, false, false, false],
    "Sam": [false, false, false, false],
    "Dim": [false, false, false, false]
  }
}

export async function getAvailability() {
  const userId = await getCurrentUserId()
  return firebase.database()
    .ref(`${AVAILABILITY_TABLE_NAME}/${userId}`)
    .once('value')
    .then((snapshot) => {
      if (snapshot.exists && snapshot.val()) {
        return snapshot.val()
      }
      else {
        return getDefaultAvailability()
      }
    }
    )
}

export async function updateAvailability(availability) {
  const userId = await getCurrentUserId()
  if (userId) {
    return firebase.database().ref(`${AVAILABILITY_TABLE_NAME}/${userId}`)
      .update(availability).then(() => {
        return availability
      })
  }
  return null
}

export async function getFavorites() {
  const userId = await getCurrentUserId()
  return firebase.database()
    .ref(`${FAVORITE_TABLE_NAME}/${userId}`)
    .once('value')
    .then((snapshot) => {
      if (snapshot.exists && snapshot.val()) {
        return snapshot.val()
      }
      else {
        return { "favoriteJobs": [] }
      }
    }
    )
}

export function isJobFavorite(jobId, favorites) {
  return favorites.includes(jobId)
}

export async function updateFavorites(favorites) {
  const favoriteJobs = { "favoriteJobs": favorites }
  const userId = await getCurrentUserId()
  if (userId) {
    return firebase.database().ref(`${FAVORITE_TABLE_NAME}/${userId}`)
      .update(favoriteJobs).then(() => {
        return favoriteJobs.favoriteJobs
      })
  }
  return null
}

export async function getAppliedJobs() {
  const userId = await getCurrentUserId()
  try {
    return firebase.database()
      .ref(`${APPLIED_TABLE_NAME}/${userId}`)
      .once('value')
      .then((snapshot) => {
        if (snapshot.exists && snapshot.val()) {
          return snapshot.val()
        }
        else {
          return { "appliedJobs": [] }
        }
      }
      )
  } catch (e) {
    console.log('==== error: ', e)
    return { "appliedJobs": [] }
  }
}

export function isJobApplied(jobId, appliedJobs) {
  return appliedJobs.includes(jobId)
}

export async function updateAppliedJobs(jobs) {
  const appliedJobs = { "appliedJobs": jobs }
  const userId = await getCurrentUserId()
  if (userId) {
    try {
      return firebase.database().ref(`${APPLIED_TABLE_NAME}/${userId}`)
        .update(appliedJobs).then(() => {
          return appliedJobs.appliedJobs
        })
    } catch (e) {
      console.log('==== error: ', e)
      return null
    }
  }
  return null
}

export async function updateUserInfo(data) {
  const uid = await getCurrentUserId();
  if (uid) {
    return firebase.database().ref(`${USER_TABLE_NAME}/${uid}`)
      .update(data).then(() => {
        return uid;
      });
  }
  return null;
}

export async function createUserDummyJSON() {
  let users = {
    "-MBC5lHoTRfthA545U7Y": {
      "email": "alex@gmail.com",
      "firstname": "Alex",
      "lastname": "Hong",
      "zipcode": "391029"
    },
    "-MBC6RCGSgLNcGJglgSi": {
      "email": "james@gmail.com",
      "firstname": "James",
      "lastname": "Bruto",
      "zipcode": "385043"
    }
  }

  try {
    return firebase.database().ref(`${USER_TABLE_NAME}`)
      .set(users).then(() => {
        return null;
      });
  } catch (e) {
    console.log("===== User Dummy Error: ", e)
    return e;
  }
}

export async function createJobDummyJSON() {
  let jobs = {
    "-MHKm2GEl1Gzxa5vJHnR": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-09-15 16:37:20",
      "description": "<p>Genesis RH, ce n'est pas qu'une agence int&eacute;rim. C'est avant tout une &eacute;quipe dynamique et &agrave; l'&eacute;coute. Notre priorit&eacute; : vous trouver au plus vite un emploi qui r&eacute;pondra &agrave; vos envies. Travail temporaire, CDD et CDI, nous vous trouvons dans les meilleurs d&eacute;lais une entreprise qui partage vos valeurs et votre vision du monde professionnel.</p>",
      "experience": "Expérience souhaitée",
      "id": "18529_0",
      "location": "Igé",
      "position": "<p>Nous recherchons pour notre client, sp&eacute;cialiste du b&acirc;timent, un ma&ccedil;on coffreur traditionnel H/F sur le secteur d'Ig&eacute; (71).</p> <p>Vos missions :&nbsp;</p> <p><br />Vous &ecirc;tes en charge de r&eacute;aliser les op&eacute;ration de coffrage, ferraillage.</p> <p>Vous effectuez la r&eacute;servation pour l'installation des canalisations.</p> <p>Vous &ecirc;tes capable de monter et couler une dalle, ma&ccedil;onner les murs par assemblage de diff&eacute;rents mat&eacute;riaux.</p> <p>Vous fabriquez et posez des coffrages.</p> <p>&nbsp;</p> <p>&nbsp;</p> <p>&nbsp;</p> <p>&nbsp;</p>",
      "postcode": "71960",
      "profile": "<p>Vous &ecirc;tes exp&eacute;riment&eacute; et autonome ? Alors ce poste est fait pour vous!</p> <p>Postulez d&egrave;s &agrave; pr&eacute;sent!</p>",
      "rome": "F1703",
      "salary": "11 €/heure",
      "title": "macon traditionnel - H/F",
      "url": "https://genesis.softy.pro/offre/18529?idt=105"
    },
    "-MHKm2GPEDnDuaauwQxB": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-09-10 15:42:45",
      "description": "<p>Genesis RH, est une&nbsp;agence d'emploi sp&eacute;cialis&eacute;e dans l'expertise m&eacute;tier (int&eacute;rim, CDD, CDI). Une&nbsp;&eacute;quipe dynamique et &agrave; l'&eacute;coute pour vous accompagner dans votre recherche&nbsp;d'emploi qui r&eacute;pondra &agrave; vos envies, vos attentes et &agrave; votre exp&eacute;rience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;d&eacute;lais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel.&nbsp;</p>",
      "experience": "Expérience souhaitée",
      "id": "18433_0",
      "location": "La Roche-Vineuse",
      "position": "<p>Nous recherchons un Peintre H/F pour une mission de quelques semaines sur des chantiers aux alentours de M&acirc;con.</p> <p>Vos missions consistent &agrave; :</p> <ul> <li>Implanter et s&eacute;curiser le chantier par l'installation d'&eacute;chafaudages, de gardes de corps ...</li> <li>Pr&eacute;parer le support &agrave; rev&ecirc;tir et appliquer des enduits</li> <li>Pr&eacute;parer la peinture</li> <li>Appliquer les couches primaires, interm&eacute;diaires et de finition</li> <li>Pr&eacute;parer et coller un rev&ecirc;tement mural</li> </ul> <p>&nbsp;</p>",
      "postcode": "71960",
      "profile": "<p>Savoir</p> <ul> <li>Ragr&eacute;age</li> <li>R&egrave;gles et consignes de s&eacute;curit&eacute;</li> <li>Caract&eacute;ristiques des enduits, des peintures</li> </ul> <p>Vous &ecirc;tes polyvalent, autonome et rigoureux ? N'attendez plus et envoyez nous votre candidature !</p>",
      "rome": "F1606",
      "salary": "12 €/heure",
      "title": "PEINTRE - H/F",
      "url": "https://genesis.softy.pro/offre/18433?idt=105"
    },
    "-MHKm2GXsthofeb9JAog": {
      "contract_type": "CDD",
      "country": "France",
      "date": "2020-09-09 17:04:52",
      "description": "<p>Genesis RH, est une&nbsp;agence d'emploi sp&eacute;cialis&eacute;e dans l'expertise m&eacute;tier (int&eacute;rim, CDD, CDI). Une&nbsp;&eacute;quipe dynamique et &agrave; l'&eacute;coute pour vous accompagner dans votre recherche&nbsp;d'emploi qui r&eacute;pondra &agrave; vos envies, vos attentes et &agrave; votre exp&eacute;rience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;d&eacute;lais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel.&nbsp;</p>",
      "experience": "Expérience souhaitée",
      "id": "18406_0",
      "location": "Viré",
      "position": "<p>- Recherche dessinateur projeteur pour une mission d'un mois en Otobre.&nbsp;<br />- Travail en bureau d'&eacute;tude.&nbsp;<br />- R&eacute;alisation tout type d'ouvrage m&eacute;tallique (escaliers, garde-corps..)&nbsp;<br />- Utilisation logiciel TopSolid (comme SolidWork)&nbsp;<br /><br /><br /></p>",
      "postcode": "71260",
      "profile": "<p>Personne minutieuse, pr&eacute;cise, cr&eacute;ative, organis&eacute;e, m&eacute;thodique.&nbsp;</p>",
      "rome": "H1203",
      "salary": "A définir suivant profil",
      "title": "dessinateur projeteur  - H/F - H/F",
      "url": "https://genesis.softy.pro/offre/18406?idt=105"
    },
    "-MHKm2GefmO2PYyoMQV6": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-09-09 16:39:49",
      "description": "<p>Genesis RH, est une&nbsp;agence d'emploi sp&eacute;cialis&eacute;e dans l'expertise m&eacute;tier (int&eacute;rim, CDD, CDI). Une&nbsp;&eacute;quipe dynamique et &agrave; l'&eacute;coute pour vous accompagner dans votre recherche&nbsp;d'emploi qui r&eacute;pondra &agrave; vos envies, vos attentes et &agrave; votre exp&eacute;rience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;d&eacute;lais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel.&nbsp;</p>",
      "experience": "Expérience souhaitée",
      "id": "18405_0",
      "location": "Bourgoin-Jallieu",
      "position": "<p>Nous recherchons pour notre client, entreprise ind&eacute;pendante sp&eacute;cialis&eacute;e dans les travaux publics, un conducteur d'engin H/F.</p> <p>Vos missions seront d'assurer des missions de conduite d'une mini pelle et d'une pelle de 8 T. sur diff&eacute;rents chantiers autour de Bourgoin Jallieu.</p>",
      "postcode": "38300",
      "profile": "<p>Vous &ecirc;tes &agrave; l'aise en conduite d'engins TP,</p> <p>Vous justifiez d'une exp&eacute;rience significative,</p> <p>Vous b&eacute;n&eacute;ficiez d'un CACES engins 1 et 2,</p> <p>Postulez ! Nous reviendrions vers vous rapidement !</p>",
      "rome": "F1302",
      "salary": "13 €/heure",
      "title": "CONDUCTEUR DE PELLE ET MINI PELLE - H/F",
      "url": "https://genesis.softy.pro/offre/18405?idt=105"
    },
    "-MHKm2Gk2e-5s0gGrHpO": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-09-09 14:56:53",
      "description": "<p>Genesis RH, est une&nbsp;agence d'emploi sp&eacute;cialis&eacute;e dans l'expertise m&eacute;tier (int&eacute;rim, CDD, CDI). Une&nbsp;&eacute;quipe dynamique et &agrave; l'&eacute;coute pour vous accompagner dans votre recherche&nbsp;d'emploi qui r&eacute;pondra &agrave; vos envies, vos attentes et &agrave; votre exp&eacute;rience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;d&eacute;lais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel.&nbsp;</p>",
      "experience": "Expérience souhaitée",
      "id": "18402_0",
      "location": "Bourg-Saint-Maurice",
      "position": "<p>Nous recherchons un Ma&ccedil;on finisseur H/F proximit&eacute; de Bourg Saint Maurice (73) pour une dur&eacute;e de quelques semaines.</p> <p>Vous travaillerez au sein d'un grand groupe dynamique sur un chantier de gros oeuvre de grande ampleur.</p> <p>Vous serez charg&eacute;(e) de :</p> <ul> <li>Lisser le b&eacute;ton</li> <li>R&eacute;aliser et/ou reboucher les r&eacute;servations dans le b&eacute;ton</li> <li>Restaurer les structures en b&eacute;ton</li> <li>Effectuer les reprises sur les ouvrages pour les rendre conformes</li> <li>Travailler en hauteur</li> <li>Finitions gros &oelig;uvres</li> </ul> <p>Nous vous proposer un contrat en int&eacute;rim.</p> <p>Taux horaire &agrave; d&eacute;finir + 10% ICP + 10% IFM + primes d&eacute;placements</p> <p>&nbsp;</p>",
      "postcode": "73700",
      "profile": "<p>Vous &ecirc;tes autonome, dynamique, ponctuel, rigoureux ? Alors n'h&eacute;sitez plus et rejoignez-nous !</p>",
      "rome": "F1703",
      "salary": "14 €/heure",
      "title": "MACON FINISSEUR - H/F",
      "url": "https://genesis.softy.pro/offre/18402?idt=105"
    },
    "-MHKm2GspDn69kgI__ud": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-09-09 09:32:23",
      "description": "<p>Genesis RH, ce n'est pas qu'une agence int&eacute;rim. C'est avant tout une &eacute;quipe dynamique et &agrave; l'&eacute;coute. Notre priorit&eacute; : vous trouver au plus vite un emploi qui r&eacute;pondra &agrave; vos envies. Travail temporaire, CDD et CDI, nous vous trouvons dans les meilleurs d&eacute;lais une entreprise qui partage vos valeurs et votre vision du monde professionnel.</p>",
      "experience": "Expérience exigée",
      "id": "18381_0",
      "location": "Saint-Quentin-Fallavier",
      "position": "<p>Nous recherchons pour l'un de nos clients, entreprise sp&eacute;cialis&eacute;e dans le montage de pi&egrave;ces m&eacute;caniques,&nbsp; un Tourneur/Fraiseur H/F sur commandes num&eacute;riques afin de r&eacute;aliser les missions suivantes :</p> <p><br />&bull;Configurer un programme, choisir les outils de coupe.<br />&bull;Planifier le montage des diff&eacute;rentes pi&egrave;ces et r&eacute;gler la machine en fonction.<br />&bull;S'assurer de la conformit&eacute; et de la qualit&eacute; des pi&egrave;ces<br />&bull;Assurer la maintenance des machines&nbsp;(entretien pr&eacute;ventif et petites r&eacute;parations simples).<br /><br /></p>",
      "postcode": "38070",
      "profile": "<p>Ce poste n&eacute;cessite de la concentration, de la rigueur et beaucoup de passion !</p> <p>Si vous vous reconnaissez dans ce profil-l&agrave;, n'h&eacute;sitez plus... postulez !</p> <p>Nous reviendrons vers vous rapidement.</p>",
      "rome": "H2903",
      "salary": "A définir suivant profil",
      "title": "Tourneur Fraiseur sur commande numérique - H/F",
      "url": "https://genesis.softy.pro/offre/18381?idt=105"
    },
    "-MHKm2H0z8V7Rr9COiHF": {
      "contract_type": "CDI",
      "country": "France",
      "date": "2020-09-08 15:25:22",
      "description": "<p>Genesis RH, est une&nbsp;agence d'emploi sp&eacute;cialis&eacute;e dans l'expertise m&eacute;tier (int&eacute;rim, CDD, CDI). Une&nbsp;&eacute;quipe dynamique et &agrave; l'&eacute;coute pour vous accompagner dans votre recherche&nbsp;d'emploi qui r&eacute;pondra &agrave; vos envies, vos attentes et &agrave; votre exp&eacute;rience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;d&eacute;lais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel.&nbsp;</p>",
      "experience": "Expérience exigée",
      "id": "18372_0",
      "location": "Saint-Chamond",
      "position": "<p>Nous recherchons pour un contrat CDI, un conducteur chef d&rsquo;&eacute;quipe, chef de parc pour une activit&eacute; de transport sp&eacute;ciaux.</p> <p>VOS MISSIONS :</p> <p>Gestion de 20 conducteurs,</p> <p>Faire l'interface entre les conducteurs et le client.</p> <p>Suivre le parc pour signaler les anomalies et prendre les rdv d&rsquo;entretiens.</p> <p>VOS HORAIRES :</p> <p>Poste en journ&eacute;e du lundi au vendredi, sans d&eacute;coucher.</p> <p>Prise de service vers 6h00 .</p>",
      "postcode": "42400",
      "profile": "<p>Vous avez le Permis CE,</p> <p>Une exp&eacute;rience justificative dans les transports sp&eacute;ciaux et/ou transports exceptionnels,</p> <p>vous avez une bonne capacit&eacute; &agrave; f&eacute;d&eacute;rer et vous &ecirc;tes m&eacute;thodique et organis&eacute;,</p> <p>Postulez ! Cette offre est faite pour vous !</p>",
      "rome": "N4101",
      "salary": "A définir suivant profil",
      "title": "CHEF DE PARC SPL - H/F",
      "url": "https://genesis.softy.pro/offre/18372?idt=105"
    },
    "-MHKm2HACSf7rdRsOoe6": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-09-08 14:20:18",
      "description": "<p>Genesis RH, est une&nbsp;agence d'emploi sp&eacute;cialis&eacute;e dans l'expertise m&eacute;tier (int&eacute;rim, CDD, CDI). Une&nbsp;&eacute;quipe dynamique et &agrave; l'&eacute;coute pour vous accompagner dans votre recherche&nbsp;d'emploi qui r&eacute;pondra &agrave; vos envies, vos attentes et &agrave; votre exp&eacute;rience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;d&eacute;lais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel.&nbsp;</p>",
      "experience": "Expérience souhaitée",
      "id": "18369_0",
      "location": "Mâcon",
      "position": "<p>Nous recherchons pour l'un de nos clients dont les chantiers se situent &agrave; M&acirc;con et alentours, un COUVREUR H/F qualifi&eacute; !</p> <p>Vos missions seront de :</p> <p>- recouvrir les toits de tuiles, d&rsquo;ardoises, de zinc...</p> <p>- assurer l&rsquo;&eacute;tanch&eacute;it&eacute; et l&rsquo;&eacute;vacuation des eaux de pluie, du fa&icirc;tage &agrave; la ligne d&rsquo;&eacute;gout jusqu'au r&eacute;seau collectif d&rsquo;&eacute;vacuation des eaux pluviales&nbsp;</p> <p>- intervenir&nbsp;apr&egrave;s la pose de la charpente pour un b&acirc;timent neuf, ou &agrave; l&rsquo;occasion d&rsquo;une r&eacute;paration sur les toitures des maisons individuelles comme des immeubles collectifs</p> <p>- poser l&rsquo;isolation thermique sous le toit</p> <p>&nbsp;</p> <p>Base hebdomadaire 35h&nbsp;</p> <p>Indemnit&eacute;s diverses li&eacute;es &agrave; l'agence d'interim : +10% IFM + 10% ICP</p> <p>Panier repas&nbsp;</p> <p>Indemnit&eacute; de d&eacute;placements&nbsp;</p> <p>Avantages li&eacute;s &agrave; l'entreprise&nbsp;</p>",
      "postcode": "71000",
      "profile": "<p>Vous avez la capacit&eacute; de&nbsp;travailler en hauteur, vous &ecirc;tes une personne motiv&eacute;e, rigoureuse et polyvalente.</p> <p>Alors n'h&eacute;sitez plus et candidatez d&egrave;s maintenant ou rendez-vous directement en agence!</p> <p>Au plaisir de travailler avec vous !</p>",
      "rome": "F1610",
      "salary": "A définir suivant profil",
      "title": "COUVREUR - H/F",
      "url": "https://genesis.softy.pro/offre/18369?idt=105"
    },
    "-MHKm2HJCDTOw5K8jNdc": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-09-02 15:55:39",
      "description": "<p>Genesis RH, est une&nbsp;agence d'emploi sp&eacute;cialis&eacute;e dans l'expertise m&eacute;tier (int&eacute;rim, CDD, CDI). Une&nbsp;&eacute;quipe dynamique et &agrave; l'&eacute;coute pour vous accompagner dans votre recherche&nbsp;d'emploi qui r&eacute;pondra &agrave; vos envies, vos attentes et &agrave; votre exp&eacute;rience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;d&eacute;lais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel.&nbsp;</p>",
      "experience": "Expérience exigée",
      "id": "18232_0",
      "location": "Bourgoin-Jallieu",
      "position": "<p>Nous recherchons pour notre client, entreprise automobile familiale, un Monteur en Pneumatiques auto H/F.</p> <p>*Vos missions seront :</p> <div> <p>- D&eacute;tecter les types d&rsquo;usure de la gomme du pneu&nbsp;ainsi que le mauvais fonctionnement du&nbsp;parall&eacute;lisme, des syst&egrave;mes de freins ou de direction.<br />- Contr&ocirc;le des pneus&nbsp;(pression, d&eacute;formation,&nbsp;&eacute;quilibrage&nbsp;des roues, etc.) ainsi qu&rsquo;au niveau des organes de s&eacute;curit&eacute;.<br />- Changer les pneus et &eacute;quilibrer les&nbsp;roues. Replace les amortisseurs, remplacer les plaquettes de freins et r&eacute;aliser les r&eacute;glages n&eacute;cessaires.<br /><br />*Outils et des mat&eacute;riels : appareils de mesure, pont &eacute;l&eacute;vateur, cric, d&eacute;monte-pneu, bancs de contr&ocirc;le et de freinage, etc.</p> </div>",
      "postcode": "38300",
      "profile": "<p>Vous justifiez d'une exp&eacute;rience significative au sein d'un poste similaire,<br />Vous b&eacute;n&eacute;ficiez d'un CAP maintenance des v&eacute;hicules automobiles.</p> <p>Postulez, nous reviendrons vers vous rapidement.</p> <p>&nbsp;</p>",
      "rome": "I1604",
      "salary": "11 €/heure",
      "title": "MONTEUR EN PNEUMATIQUES - H/F",
      "url": "https://genesis.softy.pro/offre/18232?idt=105"
    },
    "-MHKm2HTnw2Za82dfHfL": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-09-01 17:12:12",
      "description": "<p>Genesis RH, est une&nbsp;agence d'emploi sp&eacute;cialis&eacute;e dans l'expertise m&eacute;tier (int&eacute;rim, CDD, CDI). Une&nbsp;&eacute;quipe dynamique et &agrave; l'&eacute;coute pour vous accompagner dans votre recherche&nbsp;d'emploi qui r&eacute;pondra &agrave; vos envies, vos attentes et &agrave; votre exp&eacute;rience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;d&eacute;lais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel.&nbsp;</p>",
      "experience": "Débutant accepté",
      "id": "18199_0",
      "location": "Mâcon",
      "position": "<p>AGENCE EMPLOI GENESISRH RECHERCHE :</p> <p>AIDE MACON TRADITIONNEL OU APPRENTI VOULANT SE PERFECTIONNER DANS LE METIER DE LA MACONNERIE TRADITIONNELLE.</p>",
      "postcode": "71000",
      "profile": "<p>JEUNE</p> <p>MOTIVE&nbsp;</p> <p>DYNAMIQUE&nbsp;</p> <p>AYANT L'ENVIE D'APPRENDRE ET/OU DE SE PERFECTIONNER&nbsp;</p>",
      "rome": "F1704",
      "salary": "A définir suivant profil",
      "title": "Aide maçon  - H/F",
      "url": "https://genesis.softy.pro/offre/18199?idt=105"
    },
    "-MHKm2HcKGvrbCaP4kXI": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-09-01 10:43:44",
      "description": "<p>Genesis RH, est une&nbsp;agence d'emploi sp&eacute;cialis&eacute;e dans l'expertise m&eacute;tier (int&eacute;rim, CDD, CDI). Une&nbsp;&eacute;quipe dynamique et &agrave; l'&eacute;coute pour vous accompagner dans votre recherche&nbsp;d'emploi qui r&eacute;pondra &agrave; vos envies, vos attentes et &agrave; votre exp&eacute;rience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;d&eacute;lais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel.&nbsp;</p>",
      "experience": "Expérience souhaitée",
      "id": "18170_0",
      "location": "Chambéry",
      "position": "<p>Nous recherchons un conducteur d'engins pour conduire une pelle ou un bull en Grand D&eacute;placement dans le 73 ou 74.</p> <p>Vous travaillerez au sein d'une entreprise de TP sp&eacute;cialis&eacute;e dans les travaux en carri&egrave;ren, la canalisation et le terrassement.&nbsp;</p> <p>Nous cherchons une personne mobile pour partir rapidement en Grand D&eacute;placement dans le 73 ou 74. De plus, nous attendons que tous vos documents soient &agrave; jour (visite m&eacute;dicale, caces...)</p> <p>Vos missions seront de :</p> <p>- v&eacute;rifier l'engin avant&nbsp;son utilisation</p> <p>- conduite de l'engin&nbsp;</p> <p>- respect des consignes de s&eacute;curit&eacute; et des consignes visuelles lors de la conduite</p> <p>- petite maintenance en cas de probl&egrave;me</p> <p>&nbsp;</p> <p>Vous b&eacute;n&eacute;ficierez d'un contrat en int&eacute;rim de longue dur&eacute;e avec de nombreux avantages :</p> <p>+ 10% d'IFM<br />+ 10% d'ICP<br />Indemnit&eacute;s de Grand D&eacute;placement<br />Indemnit&eacute;s de D&eacute;placement&nbsp;<br />Paniers repas</p>",
      "postcode": "73000",
      "profile": "<p>Nous recherchons une personne disponible tout de suite avec des réelles qualités personnelles et professionnelles.&nbsp;</p><p>SAVOIR ETRE :</p><p>- minutieux<br>- assidu<br>- ponctuel<br>- bon relationnel</p><p>N'hésitez pas à nous envoyer votre candidature dès à présent. Au plaisir de travailler avec vous<br></p>",
      "rome": "F1302",
      "salary": "A définir suivant profil",
      "title": "CONDUCTEUR D'ENGINS - H/F",
      "url": "https://genesis.softy.pro/offre/18170?idt=105"
    },
    "-MHKm2Hoft_SJcZqeAtp": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-09-01 10:43:44",
      "description": "<p>Genesis RH, est une&nbsp;agence d'emploi sp&eacute;cialis&eacute;e dans l'expertise m&eacute;tier (int&eacute;rim, CDD, CDI). Une&nbsp;&eacute;quipe dynamique et &agrave; l'&eacute;coute pour vous accompagner dans votre recherche&nbsp;d'emploi qui r&eacute;pondra &agrave; vos envies, vos attentes et &agrave; votre exp&eacute;rience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;d&eacute;lais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel.&nbsp;</p>",
      "experience": "Expérience souhaitée",
      "id": "18170_1",
      "location": "Gaillard",
      "position": "<p>Nous recherchons un conducteur d'engins pour conduire une pelle ou un bull en Grand D&eacute;placement dans le 73 ou 74.</p> <p>Vous travaillerez au sein d'une entreprise de TP sp&eacute;cialis&eacute;e dans les travaux en carri&egrave;ren, la canalisation et le terrassement.&nbsp;</p> <p>Nous cherchons une personne mobile pour partir rapidement en Grand D&eacute;placement dans le 73 ou 74. De plus, nous attendons que tous vos documents soient &agrave; jour (visite m&eacute;dicale, caces...)</p> <p>Vos missions seront de :</p> <p>- v&eacute;rifier l'engin avant&nbsp;son utilisation</p> <p>- conduite de l'engin&nbsp;</p> <p>- respect des consignes de s&eacute;curit&eacute; et des consignes visuelles lors de la conduite</p> <p>- petite maintenance en cas de probl&egrave;me</p> <p>&nbsp;</p> <p>Vous b&eacute;n&eacute;ficierez d'un contrat en int&eacute;rim de longue dur&eacute;e avec de nombreux avantages :</p> <p>+ 10% d'IFM<br />+ 10% d'ICP<br />Indemnit&eacute;s de Grand D&eacute;placement<br />Indemnit&eacute;s de D&eacute;placement&nbsp;<br />Paniers repas</p>",
      "postcode": "74240",
      "profile": "<p>Nous recherchons une personne disponible tout de suite avec des réelles qualités personnelles et professionnelles.&nbsp;</p><p>SAVOIR ETRE :</p><p>- minutieux<br>- assidu<br>- ponctuel<br>- bon relationnel</p><p>N'hésitez pas à nous envoyer votre candidature dès à présent. Au plaisir de travailler avec vous<br></p>",
      "rome": "F1302",
      "salary": "A définir suivant profil",
      "title": "CONDUCTEUR D'ENGINS - H/F",
      "url": "https://genesis.softy.pro/offre/18170?idt=105"
    },
    "-MHKm2HzrJThT-wc7lVo": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-08-28 16:15:40",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Expérience souhaitée",
      "id": "18132_0",
      "location": "Mâcon",
      "position": "<p>Nous recherchons pour notre client des aides/ monteurs lignard pour une mission d'intérim de longue durée.&nbsp;</p><p>Vous partirez à la semaine en grand déplacement afin d'installer des lignes à moyenne, haute ou très haute tension.</p><p>Nous attendons par conséquent des personnes ayant comme compétences :</p><p>* Réalisation de montage et de raccordement d'installation électriques dans le domaine poste haute tension de 20KV a 400KV</p><p>* Réalisation des travaux en hauteur pour les prestations HTB</p><p>* Manutention et installation des appareils HTB avec engins.</p><p>* Réalisation du déroulage et du raccordement des câbles HTA et BT</p><p>* Assurer les autocontrôles</p><p>* Respect des consignes de sécurité.<br></p>",
      "postcode": "71000",
      "profile": "<p>Nous cherchons des personnes n'ayant pas peur du vide et pouvant réaliser les travaux évoqués.</p><p>Si vous correspondez au poste merci de nous faire parvenir vos candidatures.</p><p><br></p><p>Au plaisir de travailler avec vous.</p><p><br></p><p><br></p>",
      "rome": "I1307",
      "salary": "A définir suivant profil",
      "title": "Aide monteur lignard - H/F",
      "url": "https://genesis.softy.pro/offre/18132?idt=105"
    },
    "-MHKm2IAxwu4qKuyAlVS": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-08-28 10:22:30",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Expérience exigée",
      "id": "18119_0",
      "location": "",
      "position": "<p>Nous cherchons pour l'un de nos clients, entreprise spécialisée dans les travaux publics, un conducteur d'engins caces 3 R372 et/ou caces C2 R482 H/F</p><p>Votre missions sera:</p><p>. Conduite d'un BULL C6 pour des travaux de finition</p>",
      "postcode": "",
      "profile": "<p>Vous êtes motivé(e) et autonome ?</p><p>Vous avez l'esprit d'équipe ?</p><p>Alors n'hésitez pas et postulez !</p><p>Nous reviendrons vers vous rapidement.<br></p>",
      "rome": "F1302",
      "salary": "A définir suivant profil",
      "title": "CONDUCTEUR D'ENGINS CACES 3 H/F - H/F",
      "url": "https://genesis.softy.pro/offre/18119?idt=105"
    },
    "-MHKm2IKdyzmO5V9NjNY": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-08-27 11:16:43",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Expérience exigée",
      "id": "18112_0",
      "location": "Mâcon",
      "position": "<p>Nous recherchons des plaquistes confirmés pour un démarrage très rapidement sur la région mâconnaise.</p><p>Si vous êtes disponibles tout de suite et confirmés, vous nous intéressés.&nbsp;</p><p>Vous travaillerez pour un de nos clients, spécialiste dans la construction de maison individuelle et dans la rénovation</p><p>Vos missions seront de :</p><p>   <p><span><span>¨<span>&nbsp; </span></span></span><span>Implanter et sécuriser le chantier par l'installation d'échafaudages, de gardes de corps anti-chutes, de lignes de vie, et des stocks de matériaux</span></p>  <p><span><span>¨<span>&nbsp; </span></span></span><span>Réaliser et fixer des huisseries, encadrements et montants en fonction des réservations ou des ouvertures</span></p>  <p><span><span>¨<span>&nbsp; </span></span></span><span>Fixer l'ossature et y poser des sols et des plafonds suspendus</span></p>  <p><span><span>¨<span>&nbsp; </span></span></span><span>Poser des revêtements souples de murs, de sols et des couches d'isolation</span></p>  <p><span><span>¨<span>&nbsp; </span></span></span><span>Monter des cloisons et des doublages en panneaux</span></p>  <p><span><span>¨<span>&nbsp; </span></span></span><span>Jointoyer et renforcer la structure des panneaux</span></p>  <p><span><span>¨<span>&nbsp; </span></span></span><span>Apporter un conseil technique au client sur le choix des matériaux</span></p>     <br></p>",
      "postcode": "71000",
      "profile": "<p>Nous recherchons des&nbsp;personne assidues, motivées, expérimentées avec un très bon relationnel afin de faciliter au mieux l'intégration au sein de l'entreprise.</p><p>Au delà de compétences professionnelles, nous attendons des&nbsp;personne dotées de compétences humaines.</p><p>Merci d'envoyer vos candidatures si vous êtes intéressés.</p><p>Au plaisir de travailler avec vous.</p>",
      "rome": "F1604",
      "salary": "A définir suivant profil",
      "title": "PLAQUISTE - H/F",
      "url": "https://genesis.softy.pro/offre/18112?idt=105"
    },
    "-MHKm2IWjYR9xUJgIq9L": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-08-26 11:58:16",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Débutant accepté",
      "id": "18086_0",
      "location": "Lyon",
      "position": "<p>Nous recherchons pour notre client situé dans l'Ouest lyonnais, un/e aide médico-psychologique pour assister les patients au sein de l'EHPAD.&nbsp;</p><p>Nous proposons des postes en journée, matin, soir ou nuit.</p><p>Vos missions seront de :</p><p>- accompagner les patients lors du lever</p><p>- les aider ou directement prodiguer la toilette</p><p>- accompagner les patients lors des actes de vie du quotidien</p><p>- aider pour les préparations de chambres</p><p><br></p>",
      "postcode": "",
      "profile": "<p>Nous attendons des personnes motivées, compétentes et travailleuses pour faciliter au mieux l'intégration au sein de l'établissement.</p><p>Merci d'envoyer vos candidatures.&nbsp;</p><p>Au plaisir de travailler avec vous<br></p>",
      "rome": "K1301",
      "salary": "A définir suivant profil",
      "title": "aide medico-psychologique - H/F",
      "url": "https://genesis.softy.pro/offre/18086?idt=105"
    },
    "-MHKm2IhGYtkOdTKtBCS": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-08-26 11:58:16",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Débutant accepté",
      "id": "18086_1",
      "location": "Villefranche-sur-Saône",
      "position": "<p>Nous recherchons pour notre client situé dans l'Ouest lyonnais, un/e aide médico-psychologique pour assister les patients au sein de l'EHPAD.&nbsp;</p><p>Nous proposons des postes en journée, matin, soir ou nuit.</p><p>Vos missions seront de :</p><p>- accompagner les patients lors du lever</p><p>- les aider ou directement prodiguer la toilette</p><p>- accompagner les patients lors des actes de vie du quotidien</p><p>- aider pour les préparations de chambres</p><p><br></p>",
      "postcode": "69400",
      "profile": "<p>Nous attendons des personnes motivées, compétentes et travailleuses pour faciliter au mieux l'intégration au sein de l'établissement.</p><p>Merci d'envoyer vos candidatures.&nbsp;</p><p>Au plaisir de travailler avec vous<br></p>",
      "rome": "K1301",
      "salary": "A définir suivant profil",
      "title": "aide medico-psychologique - H/F",
      "url": "https://genesis.softy.pro/offre/18086?idt=105"
    },
    "-MHKm2Iuy1vncDDTQFvd": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-08-26 11:58:16",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Débutant accepté",
      "id": "18086_2",
      "location": "Bourg-en-Bresse",
      "position": "<p>Nous recherchons pour notre client situé dans l'Ouest lyonnais, un/e aide médico-psychologique pour assister les patients au sein de l'EHPAD.&nbsp;</p><p>Nous proposons des postes en journée, matin, soir ou nuit.</p><p>Vos missions seront de :</p><p>- accompagner les patients lors du lever</p><p>- les aider ou directement prodiguer la toilette</p><p>- accompagner les patients lors des actes de vie du quotidien</p><p>- aider pour les préparations de chambres</p><p><br></p>",
      "postcode": "01000",
      "profile": "<p>Nous attendons des personnes motivées, compétentes et travailleuses pour faciliter au mieux l'intégration au sein de l'établissement.</p><p>Merci d'envoyer vos candidatures.&nbsp;</p><p>Au plaisir de travailler avec vous<br></p>",
      "rome": "K1301",
      "salary": "A définir suivant profil",
      "title": "aide medico-psychologique - H/F",
      "url": "https://genesis.softy.pro/offre/18086?idt=105"
    },
    "-MHKm2J88juFi3Hz59CW": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-08-26 11:58:16",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Débutant accepté",
      "id": "18086_3",
      "location": "Mâcon",
      "position": "<p>Nous recherchons pour notre client situé dans l'Ouest lyonnais, un/e aide médico-psychologique pour assister les patients au sein de l'EHPAD.&nbsp;</p><p>Nous proposons des postes en journée, matin, soir ou nuit.</p><p>Vos missions seront de :</p><p>- accompagner les patients lors du lever</p><p>- les aider ou directement prodiguer la toilette</p><p>- accompagner les patients lors des actes de vie du quotidien</p><p>- aider pour les préparations de chambres</p><p><br></p>",
      "postcode": "71000",
      "profile": "<p>Nous attendons des personnes motivées, compétentes et travailleuses pour faciliter au mieux l'intégration au sein de l'établissement.</p><p>Merci d'envoyer vos candidatures.&nbsp;</p><p>Au plaisir de travailler avec vous<br></p>",
      "rome": "K1301",
      "salary": "A définir suivant profil",
      "title": "aide medico-psychologique - H/F",
      "url": "https://genesis.softy.pro/offre/18086?idt=105"
    },
    "-MHKm2JPApx-VcltB5TP": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-08-26 11:34:43",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Débutant accepté",
      "id": "18082_0",
      "location": "Lyon",
      "position": "<p>Nous recherchons pour notre client situé dans l'Ouest lyonnais, des auxiliaires de vie au sein d'un EHPAD.&nbsp;</p><p>Vos missions seront de :</p><p>- gérer le lever des patients de la structure</p><p>- gérer l'habillement&nbsp;</p><p>- gérer la toilette&nbsp;</p><p>- accompagner pour le coucher</p><p>- aider pour l'entretien de la chambre</p><p><br></p><p>La mission est à pourvoir directement sur la région lyonnaise, soit en journée, soit en matin, soit en soir ou en nuit.</p><p>Nous cherchons des personnes motivées, assidues, respectueuses et travailleuses pour ce poste.</p><p><br></p><p><br></p>",
      "postcode": "",
      "profile": "<p>N'hésitez pas à nous envoyer vos&nbsp;candidatures dès à présent.</p><p>Au plaisir de travailler avec vous<br></p>",
      "rome": "K1302",
      "salary": "A définir suivant profil",
      "title": "Auxiliaire de vie - H/F",
      "url": "https://genesis.softy.pro/offre/18082?idt=105"
    },
    "-MHKm2JcoY-YePC8UNXM": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-08-26 11:34:43",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Débutant accepté",
      "id": "18082_1",
      "location": "Villefranche-sur-Saône",
      "position": "<p>Nous recherchons pour notre client situé dans l'Ouest lyonnais, des auxiliaires de vie au sein d'un EHPAD.&nbsp;</p><p>Vos missions seront de :</p><p>- gérer le lever des patients de la structure</p><p>- gérer l'habillement&nbsp;</p><p>- gérer la toilette&nbsp;</p><p>- accompagner pour le coucher</p><p>- aider pour l'entretien de la chambre</p><p><br></p><p>La mission est à pourvoir directement sur la région lyonnaise, soit en journée, soit en matin, soit en soir ou en nuit.</p><p>Nous cherchons des personnes motivées, assidues, respectueuses et travailleuses pour ce poste.</p><p><br></p><p><br></p>",
      "postcode": "69400",
      "profile": "<p>N'hésitez pas à nous envoyer vos&nbsp;candidatures dès à présent.</p><p>Au plaisir de travailler avec vous<br></p>",
      "rome": "K1302",
      "salary": "A définir suivant profil",
      "title": "Auxiliaire de vie - H/F",
      "url": "https://genesis.softy.pro/offre/18082?idt=105"
    },
    "-MHKm2Js9Q-Zeni71wJR": {
      "contract_type": "CDD",
      "country": "France",
      "date": "2020-08-26 09:38:43",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Expérience exigée",
      "id": "18060_0",
      "location": "Saint-Chef",
      "position": "<p>Nous recherchons pour l'un de nos clients,&nbsp;entreprise familiale&nbsp;implantée en Isère, un monteur &nbsp;mini-ascenseurs.</p><p><br></p><p>Vos différentes missions seront:</p><p>-Déchargement du matériel</p><p> - Montage des éléments techniques </p><p>- Montage électrique</p><p> - Dépannage, SAV, entretien des ascenseurs privatifs installés</p><p> - Suivi des procédures </p><p>Vous serez amené à partir quelques fois en déplacement à la semaine dans le quart Sud-Est de France.<br></p>",
      "postcode": "38890",
      "profile": "<p>Vous êtes disponible et motivé(e)?</p><p>Vous souhaitez intégrer une entreprise familiale et une équipe professionnelle ?</p><p><br></p><p>Alors n'hésitez pas et postulez !</p><p>Nous reviendrons vers vous rapidement.</p>",
      "rome": "I1301",
      "salary": "A définir suivant profil",
      "title": "Technicien Monteur H/F - H/F",
      "url": "https://genesis.softy.pro/offre/18060?idt=105"
    },
    "-MHKm2K6KxfGUaUNWgtY": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-08-24 17:19:00",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Expérience souhaitée",
      "id": "18019_0",
      "location": "",
      "position": "<p>Nous recherchons pour l'un de nos clients, entreprise spécialisée dans le TP, un conducteur de pelle H/F.</p><p><br></p><p>Vos missions seront:</p><p>.Conduite de pelle long bras<br></p><p>.Conduite de pelle 35 tonnes GPS</p>",
      "postcode": "",
      "profile": "<p>Vous possédez le CACES 2 R372 ?</p><p>Vous êtes motivé(e) et autonome ?</p><p>Vous aimez le travail d'équipe?</p><p>N'hésitez pas et postulez ! Nous reviendrons vers vous rapidement.<br></p><p><br></p>",
      "rome": "N1104",
      "salary": "A définir suivant profil",
      "title": "CONDUCTEUR D'ENGINS TP - H/F - H/F",
      "url": "https://genesis.softy.pro/offre/18019?idt=105"
    },
    "-MHKm2KLafkrUhjls-7A": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-08-21 10:05:53",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Expérience exigée",
      "id": "17971_0",
      "location": "Saint-Jean-de-Maurienne",
      "position": "<p>Nous recherchons pour notre client, entreprise spécialisées dans les Travaux Publics, un conducteur d'engins TP H/F.</p><p><br></p><p>Votre mission sera la conduite de pelleteuse/chargeuse sur un chantier situé en Haute-Maurienne.</p>",
      "postcode": "73300",
      "profile": "<p>Autonome sur conduite de chargeuse et pelleteuse.</p><p>Esprit d'équipe et bon savoir être.</p><p>Le CACES 4 R372 serait un plus!</p><p><br></p><p>Postulez et nous reviendrons vers vous rapidement!</p><p><br></p>",
      "rome": "F1302",
      "salary": "11 €/heure",
      "title": "CONDUCTEUR D'ENGINS TP - H/F",
      "url": "https://genesis.softy.pro/offre/17971?idt=105"
    },
    "-MHKm2Kwh0H_30FPwLDl": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-08-21 08:55:29",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Débutant accepté",
      "id": "17961_0",
      "location": "Dijon",
      "position": "<p>Nous recherchons pour une entreprise de gros oeuvre spécialisée dans la construction et rénovation, un maçon finisseur à DIJON:</p><p><br></p><p>Vos missions seront les suivantes&nbsp;=</p><p>&nbsp; &nbsp; &nbsp; - Tout travaux de finissions &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p><p>&nbsp; &nbsp; &nbsp; -&nbsp; Finition de prémurs</p><p>&nbsp; &nbsp; &nbsp; - Joint&nbsp;de prémurs&nbsp; &nbsp; &nbsp; &nbsp;</p><p>&nbsp; &nbsp; &nbsp; - Ratissage au mortier&nbsp; &nbsp; &nbsp; &nbsp;</p><p>&nbsp; &nbsp; &nbsp; -Utilisation d’enduits spécifiques</p><p><br></p><p>Indemnités diverses : +10% d'IF + 10% d'ICP</p>",
      "postcode": "21000",
      "profile": "<p>Vous avez le sens du travail en équipe et individuel. Vous avez la capacité de vous&nbsp;adapter à divers environnement de travail (temps, lieu du chantier, équipe…).</p><p>Vous êtes soigneux et rigoureux dans votre travail.</p><p>Vous&nbsp;appliquez&nbsp;les consignes de sécurité.</p><p>Vous avez déjà une expérience dans le domaine alors n'hésitez plus et postulez à cette offre ou rendez vous dans notre agence!</p>",
      "rome": "F1703",
      "salary": "13 €/heure",
      "title": "MASSON FINISSEUR - H/F",
      "url": "https://genesis.softy.pro/offre/17961?idt=105"
    },
    "-MHKm2LIW3zvNd92ew6i": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-08-21 08:44:33",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Expérience souhaitée",
      "id": "17957_0",
      "location": "Meximieux",
      "position": "<p>Nous recherchons pour une entreprise&nbsp;de gros oeuvre spécialisée dans la construction et rénovation, un maçon finisseur à MEXIMIEUX.</p><p><br></p><p>Vos missions seront les suivantes&nbsp;=</p><p>&nbsp; &nbsp; &nbsp; - Tout travaux de finissions &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p><p>&nbsp; &nbsp; &nbsp; -&nbsp; Finition de prémurs</p><p>&nbsp; &nbsp; &nbsp; - Joint&nbsp;de prémurs&nbsp; &nbsp; &nbsp; &nbsp;</p><p>&nbsp; &nbsp; &nbsp; - Ratissage au mortier&nbsp; &nbsp; &nbsp; &nbsp;</p><p>&nbsp; &nbsp; &nbsp; -Utilisation d’enduits spécifiques</p><p><br></p><p>Indemnités diverses : +10% d'IF + 10% d'ICP</p>",
      "postcode": "01800",
      "profile": "<p>Vous avez le sens du travail en équipe et individuel. Vous avez la capacité de vous&nbsp;adapter à divers environnement de travail (temps, lieu du chantier, équipe…).</p><p>Vous êtes soigneux et rigoureux dans votre travail.</p><p>Vous&nbsp;appliquez&nbsp;les consignes de sécurité.</p><p>Vous avez déjà une expérience dans le domaine alors n'hésitez plus et postulez à cette offre ou rendez vous dans notre agence!</p>",
      "rome": "F1703",
      "salary": "13 €/heure",
      "title": "MACON FINISSEUR  - H/F",
      "url": "https://genesis.softy.pro/offre/17957?idt=105"
    },
    "-MHKm2L_Sw2MVhlDs3UW": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-08-18 17:10:21",
      "description": "Genesis RH, ce n'est pas qu'une agence intérim. C'est avant tout une équipe dynamique et à l'écoute. Notre priorité : vous trouver au plus vite un emploi qui répondra à vos envies. Travail temporaire, CDD et CDI, nous vous trouvons dans les meilleurs délais une entreprise qui partage vos valeurs et votre vision du monde professionnel.",
      "experience": "Débutant accepté",
      "id": "17881_0",
      "location": "Bourgoin-Jallieu",
      "position": "<p>Nous recherchons pour notre client, entreprise familiale de travaux publics, un conducteur SPL TP, afin de constituer une équipe supplémentaire.</p><p>Conduite de camion, travaux de manutention sur le chantier. </p><p><br></p>",
      "postcode": "38300",
      "profile": "<p>Vous êtes autonome et responsable.</p><p>Vous avez le sens du partage et l'esprit d'équipe.</p><p>&nbsp;Nous recherchons un conducteur SPL ayant une première expérience dans le TP avec un bon savoir être et qui accepte d'aider sur le chantier.</p><p><br></p><p>Postulez dès maintenant ! Nous vous contacterons rapidement !</p><p><br></p><p><br></p><p><br></p>",
      "rome": "N4101",
      "salary": "A définir suivant profil",
      "title": "Conducteur SPL TP - H/F",
      "url": "https://genesis.softy.pro/offre/17881?idt=105"
    },
    "-MHKm2LtUNp2p9xm9nW0": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-08-18 16:28:14",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Expérience souhaitée",
      "id": "17879_0",
      "location": "Collonges",
      "position": "<p>Nous recherchons pour l'un de nos clients, entreprise familiale spécialisée dans les travaux publics, un géomètre-topographe H/F.</p><p>Vos missions seront les suivantes:</p><p><p>.Réaliser des relevés topographiques</p><p>.Elaborer des plans et dessins de tous les détails d'un terrain</p><p>.Effectuer des repérages satellites (GPS)&nbsp;</p><p>.Procéder aux relevés métriques&nbsp;</p><p><br></p><p><br></p></p>",
      "postcode": "01550",
      "profile": "<p>Vous êtes motivé(e) et volontaire?</p><p>Alors n'hésitez pas et postulez!</p><p>Nous reviendrons vers vous rapidement.<br></p>",
      "rome": "F1107",
      "salary": "A définir suivant profil",
      "title": "Géomètre-Topographe H/F - H/F",
      "url": "https://genesis.softy.pro/offre/17879?idt=105"
    },
    "-MHKm2MBwXySJ-uE4My4": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-08-18 15:39:35",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Débutant accepté",
      "id": "17874_0",
      "location": "Mâcon",
      "position": "<p>Nous recherchons pour un de nos clients situé dans le pays de Gex, un géomètre topographe avec une première expérience dans le TP.</p><p>Vous travaillerez au sein d'une entreprise importante qui rayonne sur l'Est français sur les activités de terrassement, VRD et exploitation de carrières.</p><p>Directement rattaché à l'activité VRD, vous aurez en charge plusieurs chantiers VRD.</p><p>Vos missions seront de :</p><p>   </p><p><span><span>¨<span>&nbsp; </span></span></span><span>Effectuer des mesures topométriques et réaliser des levés topographiques de terrains (canevas d'ensemble, levé de détails, courbes de niveaux, ...)</span></p>  <p><span><span>¨<span>&nbsp; </span></span></span><span>Réaliser un relevé d'intérieur et de façade d'un ouvrage existant et déterminer le périmètre et la surface</span></p>  <p><span><span>¨<span>&nbsp; </span></span></span><span>Déterminer et matérialiser les emplacements d'implantation de chantiers</span></p>  <p><span><span>¨<span>&nbsp; </span></span></span><span>Etablir ou mettre à jour des plans d'infrastructures et de réseaux divers</span></p>  <p><span><span>¨<span>&nbsp; </span></span></span><span>Réaliser des études/documents fonciers et établir ou modifier des plans d'architecture (segmentation des surfaces, remembrement, ...)</span></p>  <p><span><span>¨<span>&nbsp; </span></span></span><span>Contrôler la conformité d'implantation des réalisations lors de la réception d'ouvrages</span></p>  <p><span><span>¨<span>&nbsp; </span></span></span><span>Etablir la cartographie numérique d'un plan cadastral et d'un Plan Local d'Urbanisme (PLU)</span></p>  <p><span><span>¨<span>&nbsp; </span></span></span><span>Inventorier les servitudes afférentes au terrain et les contraintes de construction</span></p><p><br></p><br>",
      "postcode": "71000",
      "profile": "<p>Nous recherchons pour ce poste une personne ayant déjà validé une première expérience dans le TP. Le poste est à pourvoir très rapidement.&nbsp;</p><p>Au delà des compétences techniques, nous attendons une personne avec un très bon savoir être afin de faciliter l'intégration en entreprise</p><p>Si vous correspondez à cette annonce, merci de postuler&nbsp;</p><p>Au plaisir de travailler avec vous<br></p>",
      "rome": "F1107",
      "salary": "A définir suivant profil",
      "title": "Technicien topographe/géomètre - H/F",
      "url": "https://genesis.softy.pro/offre/17874?idt=105"
    },
    "-MHKm2MUM2dnmgh2OUPR": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-08-18 15:39:35",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Débutant accepté",
      "id": "17874_1",
      "location": "Bourg-en-Bresse",
      "position": "<p>Nous recherchons pour un de nos clients situé dans le pays de Gex, un géomètre topographe avec une première expérience dans le TP.</p><p>Vous travaillerez au sein d'une entreprise importante qui rayonne sur l'Est français sur les activités de terrassement, VRD et exploitation de carrières.</p><p>Directement rattaché à l'activité VRD, vous aurez en charge plusieurs chantiers VRD.</p><p>Vos missions seront de :</p><p>   </p><p><span><span>¨<span>&nbsp; </span></span></span><span>Effectuer des mesures topométriques et réaliser des levés topographiques de terrains (canevas d'ensemble, levé de détails, courbes de niveaux, ...)</span></p>  <p><span><span>¨<span>&nbsp; </span></span></span><span>Réaliser un relevé d'intérieur et de façade d'un ouvrage existant et déterminer le périmètre et la surface</span></p>  <p><span><span>¨<span>&nbsp; </span></span></span><span>Déterminer et matérialiser les emplacements d'implantation de chantiers</span></p>  <p><span><span>¨<span>&nbsp; </span></span></span><span>Etablir ou mettre à jour des plans d'infrastructures et de réseaux divers</span></p>  <p><span><span>¨<span>&nbsp; </span></span></span><span>Réaliser des études/documents fonciers et établir ou modifier des plans d'architecture (segmentation des surfaces, remembrement, ...)</span></p>  <p><span><span>¨<span>&nbsp; </span></span></span><span>Contrôler la conformité d'implantation des réalisations lors de la réception d'ouvrages</span></p>  <p><span><span>¨<span>&nbsp; </span></span></span><span>Etablir la cartographie numérique d'un plan cadastral et d'un Plan Local d'Urbanisme (PLU)</span></p>  <p><span><span>¨<span>&nbsp; </span></span></span><span>Inventorier les servitudes afférentes au terrain et les contraintes de construction</span></p><p><br></p><br>",
      "postcode": "01000",
      "profile": "<p>Nous recherchons pour ce poste une personne ayant déjà validé une première expérience dans le TP. Le poste est à pourvoir très rapidement.&nbsp;</p><p>Au delà des compétences techniques, nous attendons une personne avec un très bon savoir être afin de faciliter l'intégration en entreprise</p><p>Si vous correspondez à cette annonce, merci de postuler&nbsp;</p><p>Au plaisir de travailler avec vous<br></p>",
      "rome": "F1107",
      "salary": "A définir suivant profil",
      "title": "Technicien topographe/géomètre - H/F",
      "url": "https://genesis.softy.pro/offre/17874?idt=105"
    },
    "-MHKm2Mn9sX_WL0yX15O": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-08-18 15:39:35",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Débutant accepté",
      "id": "17874_2",
      "location": "Lyon",
      "position": "<p>Nous recherchons pour un de nos clients situé dans le pays de Gex, un géomètre topographe avec une première expérience dans le TP.</p><p>Vous travaillerez au sein d'une entreprise importante qui rayonne sur l'Est français sur les activités de terrassement, VRD et exploitation de carrières.</p><p>Directement rattaché à l'activité VRD, vous aurez en charge plusieurs chantiers VRD.</p><p>Vos missions seront de :</p><p>   </p><p><span><span>¨<span>&nbsp; </span></span></span><span>Effectuer des mesures topométriques et réaliser des levés topographiques de terrains (canevas d'ensemble, levé de détails, courbes de niveaux, ...)</span></p>  <p><span><span>¨<span>&nbsp; </span></span></span><span>Réaliser un relevé d'intérieur et de façade d'un ouvrage existant et déterminer le périmètre et la surface</span></p>  <p><span><span>¨<span>&nbsp; </span></span></span><span>Déterminer et matérialiser les emplacements d'implantation de chantiers</span></p>  <p><span><span>¨<span>&nbsp; </span></span></span><span>Etablir ou mettre à jour des plans d'infrastructures et de réseaux divers</span></p>  <p><span><span>¨<span>&nbsp; </span></span></span><span>Réaliser des études/documents fonciers et établir ou modifier des plans d'architecture (segmentation des surfaces, remembrement, ...)</span></p>  <p><span><span>¨<span>&nbsp; </span></span></span><span>Contrôler la conformité d'implantation des réalisations lors de la réception d'ouvrages</span></p>  <p><span><span>¨<span>&nbsp; </span></span></span><span>Etablir la cartographie numérique d'un plan cadastral et d'un Plan Local d'Urbanisme (PLU)</span></p>  <p><span><span>¨<span>&nbsp; </span></span></span><span>Inventorier les servitudes afférentes au terrain et les contraintes de construction</span></p><p><br></p><br>",
      "postcode": "",
      "profile": "<p>Nous recherchons pour ce poste une personne ayant déjà validé une première expérience dans le TP. Le poste est à pourvoir très rapidement.&nbsp;</p><p>Au delà des compétences techniques, nous attendons une personne avec un très bon savoir être afin de faciliter l'intégration en entreprise</p><p>Si vous correspondez à cette annonce, merci de postuler&nbsp;</p><p>Au plaisir de travailler avec vous<br></p>",
      "rome": "F1107",
      "salary": "A définir suivant profil",
      "title": "Technicien topographe/géomètre - H/F",
      "url": "https://genesis.softy.pro/offre/17874?idt=105"
    },
    "-MHKm2NfqbEvzIehd6Lg": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-08-18 15:39:35",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Débutant accepté",
      "id": "17874_3",
      "location": "Nantua",
      "position": "<p>Nous recherchons pour un de nos clients situé dans le pays de Gex, un géomètre topographe avec une première expérience dans le TP.</p><p>Vous travaillerez au sein d'une entreprise importante qui rayonne sur l'Est français sur les activités de terrassement, VRD et exploitation de carrières.</p><p>Directement rattaché à l'activité VRD, vous aurez en charge plusieurs chantiers VRD.</p><p>Vos missions seront de :</p><p>   </p><p><span><span>¨<span>&nbsp; </span></span></span><span>Effectuer des mesures topométriques et réaliser des levés topographiques de terrains (canevas d'ensemble, levé de détails, courbes de niveaux, ...)</span></p>  <p><span><span>¨<span>&nbsp; </span></span></span><span>Réaliser un relevé d'intérieur et de façade d'un ouvrage existant et déterminer le périmètre et la surface</span></p>  <p><span><span>¨<span>&nbsp; </span></span></span><span>Déterminer et matérialiser les emplacements d'implantation de chantiers</span></p>  <p><span><span>¨<span>&nbsp; </span></span></span><span>Etablir ou mettre à jour des plans d'infrastructures et de réseaux divers</span></p>  <p><span><span>¨<span>&nbsp; </span></span></span><span>Réaliser des études/documents fonciers et établir ou modifier des plans d'architecture (segmentation des surfaces, remembrement, ...)</span></p>  <p><span><span>¨<span>&nbsp; </span></span></span><span>Contrôler la conformité d'implantation des réalisations lors de la réception d'ouvrages</span></p>  <p><span><span>¨<span>&nbsp; </span></span></span><span>Etablir la cartographie numérique d'un plan cadastral et d'un Plan Local d'Urbanisme (PLU)</span></p>  <p><span><span>¨<span>&nbsp; </span></span></span><span>Inventorier les servitudes afférentes au terrain et les contraintes de construction</span></p><p><br></p><br>",
      "postcode": "01130",
      "profile": "<p>Nous recherchons pour ce poste une personne ayant déjà validé une première expérience dans le TP. Le poste est à pourvoir très rapidement.&nbsp;</p><p>Au delà des compétences techniques, nous attendons une personne avec un très bon savoir être afin de faciliter l'intégration en entreprise</p><p>Si vous correspondez à cette annonce, merci de postuler&nbsp;</p><p>Au plaisir de travailler avec vous<br></p>",
      "rome": "F1107",
      "salary": "A définir suivant profil",
      "title": "Technicien topographe/géomètre - H/F",
      "url": "https://genesis.softy.pro/offre/17874?idt=105"
    },
    "-MHKm2NzwjitQ9hocmZs": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-08-18 15:39:35",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Débutant accepté",
      "id": "17874_4",
      "location": "Oyonnax",
      "position": "<p>Nous recherchons pour un de nos clients situé dans le pays de Gex, un géomètre topographe avec une première expérience dans le TP.</p><p>Vous travaillerez au sein d'une entreprise importante qui rayonne sur l'Est français sur les activités de terrassement, VRD et exploitation de carrières.</p><p>Directement rattaché à l'activité VRD, vous aurez en charge plusieurs chantiers VRD.</p><p>Vos missions seront de :</p><p>   </p><p><span><span>¨<span>&nbsp; </span></span></span><span>Effectuer des mesures topométriques et réaliser des levés topographiques de terrains (canevas d'ensemble, levé de détails, courbes de niveaux, ...)</span></p>  <p><span><span>¨<span>&nbsp; </span></span></span><span>Réaliser un relevé d'intérieur et de façade d'un ouvrage existant et déterminer le périmètre et la surface</span></p>  <p><span><span>¨<span>&nbsp; </span></span></span><span>Déterminer et matérialiser les emplacements d'implantation de chantiers</span></p>  <p><span><span>¨<span>&nbsp; </span></span></span><span>Etablir ou mettre à jour des plans d'infrastructures et de réseaux divers</span></p>  <p><span><span>¨<span>&nbsp; </span></span></span><span>Réaliser des études/documents fonciers et établir ou modifier des plans d'architecture (segmentation des surfaces, remembrement, ...)</span></p>  <p><span><span>¨<span>&nbsp; </span></span></span><span>Contrôler la conformité d'implantation des réalisations lors de la réception d'ouvrages</span></p>  <p><span><span>¨<span>&nbsp; </span></span></span><span>Etablir la cartographie numérique d'un plan cadastral et d'un Plan Local d'Urbanisme (PLU)</span></p>  <p><span><span>¨<span>&nbsp; </span></span></span><span>Inventorier les servitudes afférentes au terrain et les contraintes de construction</span></p><p><br></p><br>",
      "postcode": "01100",
      "profile": "<p>Nous recherchons pour ce poste une personne ayant déjà validé une première expérience dans le TP. Le poste est à pourvoir très rapidement.&nbsp;</p><p>Au delà des compétences techniques, nous attendons une personne avec un très bon savoir être afin de faciliter l'intégration en entreprise</p><p>Si vous correspondez à cette annonce, merci de postuler&nbsp;</p><p>Au plaisir de travailler avec vous<br></p>",
      "rome": "F1107",
      "salary": "A définir suivant profil",
      "title": "Technicien topographe/géomètre - H/F",
      "url": "https://genesis.softy.pro/offre/17874?idt=105"
    },
    "-MHKm2OMFO9_YgKYoTHD": {
      "contract_type": "Intérim",
      "country": "Suisse",
      "date": "2020-08-18 15:39:35",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Débutant accepté",
      "id": "17874_5",
      "location": "Genève",
      "position": "<p>Nous recherchons pour un de nos clients situé dans le pays de Gex, un géomètre topographe avec une première expérience dans le TP.</p><p>Vous travaillerez au sein d'une entreprise importante qui rayonne sur l'Est français sur les activités de terrassement, VRD et exploitation de carrières.</p><p>Directement rattaché à l'activité VRD, vous aurez en charge plusieurs chantiers VRD.</p><p>Vos missions seront de :</p><p>   </p><p><span><span>¨<span>&nbsp; </span></span></span><span>Effectuer des mesures topométriques et réaliser des levés topographiques de terrains (canevas d'ensemble, levé de détails, courbes de niveaux, ...)</span></p>  <p><span><span>¨<span>&nbsp; </span></span></span><span>Réaliser un relevé d'intérieur et de façade d'un ouvrage existant et déterminer le périmètre et la surface</span></p>  <p><span><span>¨<span>&nbsp; </span></span></span><span>Déterminer et matérialiser les emplacements d'implantation de chantiers</span></p>  <p><span><span>¨<span>&nbsp; </span></span></span><span>Etablir ou mettre à jour des plans d'infrastructures et de réseaux divers</span></p>  <p><span><span>¨<span>&nbsp; </span></span></span><span>Réaliser des études/documents fonciers et établir ou modifier des plans d'architecture (segmentation des surfaces, remembrement, ...)</span></p>  <p><span><span>¨<span>&nbsp; </span></span></span><span>Contrôler la conformité d'implantation des réalisations lors de la réception d'ouvrages</span></p>  <p><span><span>¨<span>&nbsp; </span></span></span><span>Etablir la cartographie numérique d'un plan cadastral et d'un Plan Local d'Urbanisme (PLU)</span></p>  <p><span><span>¨<span>&nbsp; </span></span></span><span>Inventorier les servitudes afférentes au terrain et les contraintes de construction</span></p><p><br></p><br>",
      "postcode": "",
      "profile": "<p>Nous recherchons pour ce poste une personne ayant déjà validé une première expérience dans le TP. Le poste est à pourvoir très rapidement.&nbsp;</p><p>Au delà des compétences techniques, nous attendons une personne avec un très bon savoir être afin de faciliter l'intégration en entreprise</p><p>Si vous correspondez à cette annonce, merci de postuler&nbsp;</p><p>Au plaisir de travailler avec vous<br></p>",
      "rome": "F1107",
      "salary": "A définir suivant profil",
      "title": "Technicien topographe/géomètre - H/F",
      "url": "https://genesis.softy.pro/offre/17874?idt=105"
    },
    "-MHKm2PGbK0gGa76F6_x": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-08-12 17:07:45",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Expérience souhaitée",
      "id": "17776_0",
      "location": "Bourgoin-Jallieu",
      "position": "<p>Nous recherchons pour notre client, EHPAD situé à BOURGOIN JALLIEU, un infirmier Diplômé d'Etat H/F.</p><p><br></p><p><br></p>",
      "postcode": "38300",
      "profile": "<p>Vous êtes diplômé(e) d'Etat et vous êtes orientée vers les personnes âgées.</p><p>Vous avez des disponibilités.</p><p>Postulez ! Nous reviendrons vers vous rapidement !</p>",
      "rome": "J1502",
      "salary": "18 €/heure",
      "title": "INFIRMIER DIPLOME D'ETAT - H/F",
      "url": "https://genesis.softy.pro/offre/17776?idt=105"
    },
    "-MHKm2PdbtJZodhBNVhk": {
      "contract_type": "CDI",
      "country": "France",
      "date": "2020-08-11 15:21:23",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Expérience exigée",
      "id": "17750_0",
      "location": "Mâcon",
      "position": "<p>Nous recherchons pour l'un de nos clients, un second de cuisine (H/F) sur une base horaire de 39h/semaine.&nbsp;</p><p>Vous serez en binôme avec le cuisinier du restaurant&nbsp;et vous l'assisterez pour la préparation des menus (entrée/plat/dessert)</p><p>Cuisine traditionnelle utilisant exclusivement des produits frais.&nbsp;</p><p>La mission peut démarrer rapidement.</p>",
      "postcode": "71000",
      "profile": "<p>Nous recherchons une personne motivée, rigoureuse, avec une rapide capacité d'adaptation.</p><p><br></p><p>03.85.20.30.00</p>",
      "rome": "G1602",
      "salary": "De 1750 €/mois à 1900 €/mois",
      "title": "SECOND DE CUISINE H/F",
      "url": "https://genesis.softy.pro/offre/17750?idt=105"
    },
    "-MHKm2Q0ln79rzHEX-9P": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-08-11 14:31:59",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Expérience exigée",
      "id": "17748_0",
      "location": "Belleville",
      "position": "<p>Nous recherchons pour notre client&nbsp;un&nbsp;chaudronnier TIG INOX H-F spécialisé dans le domaine des équipements agricoles.&nbsp;</p><p>Vous serez amené à réaliser l'ensemble de la pièce en totale autonomie de la Lecture de plans au produit fini.</p><p>Vos missions seront donc les suivantes :</p><p>- Lecture de plans</p><p>- Création de pièces</p><p>- Utilisation des différents outils : (Plieuse,&nbsp;Presse plieuse,&nbsp;Cisaille guillotine,Tour vertical,&nbsp;Tour horizontal, Poste à souder TIG, &nbsp;Scie à ruban,&nbsp;Poinçonneuse,&nbsp;Découpe plasma).</p><p>Les postes à pourvoir sont à 39h base hebdo.&nbsp;</p><p><br></p><p>Horaires :&nbsp;</p><p>du lundi au jeudi&nbsp;de 7h à 12h et de 12h45 à 16h15</p><p>vendredi&nbsp; 7h - 12h&nbsp;</p><p><br></p><p>&nbsp;</p><p><br></p><p><br></p><p><br></p>",
      "postcode": "69220",
      "profile": "<p>Nous recherchons pour notre client : Chaudronnier avec une expérience dans ce domaine.</p><p>Nous recherchons une personne motivée, travaillant en autonomie.</p><p><br></p><p><br></p><p><br></p><p><br></p>",
      "rome": "H2902",
      "salary": "13 €/heure",
      "title": "Chaudronnier - H/F",
      "url": "https://genesis.softy.pro/offre/17748?idt=105"
    },
    "-MHKm2R43V4brXb1WdVm": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-08-10 16:57:01",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Expérience souhaitée",
      "id": "17719_0",
      "location": "Vienne",
      "position": "<p>Nous recherchons pour notre client, transport national et régionale, un conducteur PL H/F, avec CACES 3 pour livrer des matériaux à bord d'un porteur, à charger décharger grâce à un chariot élévateur.</p><p>Poste avec possibilité d'évolution.<br></p>",
      "postcode": "38200",
      "profile": "<p>Vous avec les qualifications demandées et vous êtes à l'aise dans la conduite et la manoeuvre&nbsp;d'un véhicule poids lourd :</p><p>POSTULEZ ! Nous vous contacterons rapidement !</p>",
      "rome": "N4105",
      "salary": "10 €/heure",
      "title": "CONDUCTEUR PL AVEC CACES 3 - H/F",
      "url": "https://genesis.softy.pro/offre/17719?idt=105"
    },
    "-MHKm2RR3wS3n6LFnEEN": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-08-06 16:50:51",
      "description": "<p>Genesis RH, est une&nbsp;agence d'emploi sp&eacute;cialis&eacute;e dans l'expertise m&eacute;tier (int&eacute;rim, CDD, CDI). Une&nbsp;&eacute;quipe dynamique et &agrave; l'&eacute;coute pour vous accompagner dans votre recherche&nbsp;d'emploi qui r&eacute;pondra &agrave; vos envies, vos attentes et &agrave; votre exp&eacute;rience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;d&eacute;lais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel.&nbsp;</p>",
      "experience": "Expérience souhaitée",
      "id": "17658_0",
      "location": "Saint-Quentin-Fallavier",
      "position": "<p>Votre agence Genesis RH recherche, pour son client, Transporteur National bas&eacute; &agrave; St Quentin Fallavier, un chauffeur SPL frigo H/F.</p> <p>Vos missions seront :</p> <p>.Chargement/ D&eacute;chargement du camion frigorifique</p> <p>.Livraisons&nbsp;aupr&egrave;s de professionnels&nbsp;</p> <p>&nbsp;</p> <p>Horaire de journ&eacute;e et de nuit</p> <p>&nbsp;</p>",
      "postcode": "38070",
      "profile": "<p>Autonome et motiv&eacute;, vous avez un bon relationnel avec la client&egrave;le,</p> <p>Alors ce poste est fait pour vous !</p> <p>Postulez et nous reviendrons vers vous rapidement.</p>",
      "rome": "N4101",
      "salary": "10 €/heure",
      "title": "Chauffeur SPL frigo - F/H - H/F",
      "url": "https://genesis.softy.pro/offre/17658?idt=105"
    },
    "-MHKm2Rtwf_-RajDwvbR": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-08-05 16:20:04",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Expérience souhaitée",
      "id": "17626_0",
      "location": "Aoste",
      "position": "<p>Nous recherchons pour notre client, EHPAD en région Auvergne-Rhone-alpes, un(e) Aide Soignant(e) Diplômé(e).</p><p>Disponibilités sur plusieurs jours :</p><p>Horaires 7h00&nbsp;/ 14h00 ou 14h00 / 21h00</p><p><br></p><p><br></p>",
      "postcode": "38490",
      "profile": "<p>Vous êtes Diplômé(e) Aide Soignant(e).</p><p>N'hésitez pas à postuler nous reviendrons vers vous rapidement.<br></p>",
      "rome": "J1501",
      "salary": "15 €/heure",
      "title": "AIDE SOIGNANT - H/F",
      "url": "https://genesis.softy.pro/offre/17626?idt=105"
    },
    "-MHKm2T4OKun-8T2l2lI": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-08-04 16:36:45",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Expérience exigée",
      "id": "17602_0",
      "location": "Chassieu",
      "position": "<p>Nous recherchons pour notre client, entreprise spécialisée dans les travaux de forage, basée près de Lyon, un foreur H/F expérimenté(e).</p><p>Votre mission consistera à conduire une foreuse radio-télécommandée afin de réaliser des travaux de&nbsp;micro-pieux et pose de tirants et clous.</p><p>Versement des indemnités de Grand&nbsp;Déplacement&nbsp;en calendaire.</p>",
      "postcode": "69680",
      "profile": "<p>Vous justifiez d'une expérience dans le domaine du forage et vous souhaitez approfondir vos connaissances au sein d'une entreprise dynamique et à l'écoute de ses collaborateurs ?!</p><p>Postulez ! Nous reviendrons vers vous rapidement.</p>",
      "rome": "F1401",
      "salary": "14 €/heure",
      "title": "FOREUR H/F - H/F",
      "url": "https://genesis.softy.pro/offre/17602?idt=105"
    },
    "-MHKm2TT0avGFCKmF1GJ": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-08-04 16:31:19",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Expérience souhaitée",
      "id": "17601_0",
      "location": "",
      "position": "<p>Nous recherchons pour l'un de nos clients, une entreprise familiale spécialisée dans le TP et située à RUY-MONTCEAU, un conducteur MECALAC.</p><p><br></p><p>Votre&nbsp;mission:</p><p>. Conduite&nbsp;d'engins de la marque MECALAC sur un chantier de travaux publics</p>",
      "postcode": "",
      "profile": "<p>Vous possédez vos CACES engins de chantiers et&nbsp; vous maîtrisez la conduite de MECALAC ?</p><p>Vous avez l'esprit d'équipe et vous êtes motivé ?</p><p>N'hésitez pas et postulez !!</p><p>Nous reviendrons vers vous rapidement.<br></p>",
      "rome": "F1302",
      "salary": "12 €/heure",
      "title": "CONDUCTEUR DE MECALAC H/F - H/F",
      "url": "https://genesis.softy.pro/offre/17601?idt=105"
    },
    "-MHKm2TpWMBVqPC7dbh4": {
      "contract_type": "CDD",
      "country": "France",
      "date": "2020-08-04 10:54:37",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Expérience souhaitée",
      "id": "17582_0",
      "location": "Mâcon",
      "position": "<p>Nous recherchons pour un de nos clients spécialisés dans la vente d'équipement de protection individuel un magasinier afin de réaliser les missions suivantes :</p><p>- Réceptionner, stocker et préparer les équipement</p><p>- Prendre part au suivi et inventaire des stocks</p><p>- Contrôler la conformité des produit lors de la réception avec le bon de livraison</p><p>- Aider le préparateur de commandes à réunir les produits qui doivent être expédiés.</p><p><br></p><p> <br></p><p>Vous travaillerez au sein d'une&nbsp;petite équipe jeune et dynamique.</p><p>Vous travaillerez du Lundi au vendredi 8h30-12h / 14h-18h.</p><p><span><br></span></p>",
      "postcode": "71000",
      "profile": "<p>Nous recherchons pour ce poste une personne, motivée, dynamique, ayant déjà une expérience dans la gestion des stocks et logistique.</p><p>Nous recherchons quelqu'un ayant la faculté de s'adapter rapidement.</p><p>Si vous correspondez au profil recherché alors candidatez sans plus attendre!!&nbsp;</p>",
      "rome": "N1103",
      "salary": "A définir suivant profil",
      "title": "MAGASINIER - H/F",
      "url": "https://genesis.softy.pro/offre/17582?idt=105"
    },
    "-MHKm2UHHo0W9QHZ7HyR": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-07-30 15:43:56",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Expérience souhaitée",
      "id": "17520_0",
      "location": "Vienne",
      "position": "<p>Nous recherchons pour notre client, EHPAD situé à Vienne, un Infirmier Diplômé d'Etat H/F.</p><p>Poste en journée</p><p><br></p>",
      "postcode": "38200",
      "profile": "<p>Vous êtes diplômé(e) d'Etat et vous êtes orientée vers les personnes âgées.</p><p>Vous avez des disponibilités.</p><p>Postulez ! Nous reviendrons vers vous rapidement !</p>",
      "rome": "J1502",
      "salary": "18 €/heure",
      "title": "INFIRMIER DIPLOME D'ETAT - H/F - H/F",
      "url": "https://genesis.softy.pro/offre/17520?idt=105"
    },
    "-MHKm2Vf8zWluRzfvBUA": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-07-30 15:37:42",
      "description": "Genesis RH, ce n'est pas qu'une agence intérim. C'est avant tout une équipe dynamique et à l'écoute. Notre priorité : vous trouver au plus vite un emploi qui répondra à vos envies. Travail temporaire, CDD et CDI, nous vous trouvons dans les meilleurs délais une entreprise qui partage vos valeurs et votre vision du monde professionnel.",
      "experience": "Débutant accepté",
      "id": "17518_0",
      "location": "Diémoz",
      "position": "<p>Genesis RH recherche pour l'un de ses clients, un EHPAD situé à Diemoz,&nbsp;&nbsp;un/une aide-soignante.&nbsp;</p><p><br></p><p>Sous l'autorité du ou de la chef de service et de l'infirmier/e :&nbsp;</p><p>- vous accompagnerez les patients qui ne peuvent s'assumer.</p><p>- vous réaliserez certains soins.</p><p>- vous veillerez à&nbsp;l'hygiène du service ( en collaboration avec les agents de service hospitalier )&nbsp;</p><p><br></p>",
      "postcode": "38790",
      "profile": "<p>Vous disposez d'un diplôme d'état d'aide-soignant ou vous avez une bonne expérience du métier?&nbsp;</p><p>Vous avez des&nbsp;qualités d'écoute et de communication?</p><p>Vous êtes autonome, vous faites preuve de discrétion, de rigueur, et avez l'esprit d'équipe?</p><p><br></p><p>N'hésitez plus et postulez dés maintenant!!&nbsp;</p><p><br></p><p><br></p>",
      "rome": "J1501",
      "salary": "15 €/heure",
      "title": "Aide Soignant(e)  H/F  - H/F",
      "url": "https://genesis.softy.pro/offre/17518?idt=105"
    },
    "-MHKm2W8xsJ2bFgfLUKL": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-07-30 10:29:53",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Expérience souhaitée",
      "id": "17502_0",
      "location": "Jonage",
      "position": "<p>Nous recherchons pour l'un de nos clients, entreprise de transport&nbsp;située à JONAGE, un chauffeur SPL en citerne (F/H).</p><p><br></p><p>Vos missions seront:</p><p>. Conduite d'un camion citerne</p><p>. Livraisons auprès&nbsp;des clients</p><p>. Aide à la manutention</p><p>. Livraisons/ Ramasses en&nbsp;nationales<br></p><p><br></p><p>&nbsp;</p>",
      "postcode": "69330",
      "profile": "<p>Vous êtes motivé et autonome ?</p><p>Vous avez un bon relationnel avec les clients ?</p><p>ALORS POSTULEZ !!!</p><p>Nous reviendrons vers vous au plus vite.<br></p>",
      "rome": "N4101",
      "salary": "A définir suivant profil",
      "title": "Chauffeur SPL citerne (F/H) - H/F",
      "url": "https://genesis.softy.pro/offre/17502?idt=105"
    },
    "-MHKm2WrQ7vVaSaAy8M7": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-07-29 15:59:05",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Expérience souhaitée",
      "id": "17484_0",
      "location": "Caluire-et-Cuire",
      "position": "<p>Nous recherchons pour notre client, EHPAD en périphérie lyonnaise, un Infirmier Diplômé d'Etat H/F, pour 3 jours.</p><p>Poste en journée</p><p>12 heures / jour<br></p>",
      "postcode": "69300",
      "profile": "<p>Vous êtes diplômé(e) d'Etat et vous êtes orientée vers les personnes âgées.</p><p>Vous avez des disponibilités sur le 1,2 et 3 août 2020.</p><p>Postulez ! Nous reviendrons vers vous rapidement !<br></p>",
      "rome": "J1502",
      "salary": "18 €/heure",
      "title": "INFIRMIER DIPLOME D'ETAT - H/F - H/F",
      "url": "https://genesis.softy.pro/offre/17484?idt=105"
    },
    "-MHKm2Z-cJK9HktgkFaV": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-07-29 11:41:29",
      "description": "Genesis RH, ce n'est pas qu'une agence intérim. C'est avant tout une équipe dynamique et à l'écoute. Notre priorité : vous trouver au plus vite un emploi qui répondra à vos envies. Travail temporaire, CDD et CDI, nous vous trouvons dans les meilleurs délais une entreprise qui partage vos valeurs et votre vision du monde professionnel.",
      "experience": "Expérience souhaitée",
      "id": "17471_0",
      "location": "Aoste",
      "position": "<p>Nous recherchons pour une de nos entreprises familiales située&nbsp;à BELMONT-TRAMONET&nbsp;et spécialisée dans la maçonnerie traditionnelle, un/une Maçon.</p><p>Vos missions seront les suivantes :&nbsp;</p><p>-&nbsp;Monter les structures porteuses (échafaudage, étaiement, plate-forme, ...) </p><p>- Terrasser et niveler la fondation </p><p>- Monter les murs par maçonnage d'éléments portés (briques,)</p><p>- Préparer et appliquer les mortiers, enduits, ... </p><p>- Assembler et positionner les éléments d'armature d'un béton </p><p><br></p><p><br></p><p>Indemnités diverses : +10% IFM + 10% ICP</p>",
      "postcode": "38490",
      "profile": "<p>Vous êtes rigoureux, polyvalent et aimez le travail d'équipe.&nbsp; &nbsp;</p><p>Vous maîtrisez les différentes techniques de maçonnerie, d'application d'enduits ou de ferraillage.</p><p>Alors n'hésitez plus et postulez dès à présent sur notre site ou rendez-vous en agence.</p><p><br></p><p>Au plaisir de travailler prochainement avec vous!</p>",
      "rome": "F1703",
      "salary": "A définir suivant profil",
      "title": "MACON TRADITIONNEL - H/F",
      "url": "https://genesis.softy.pro/offre/17471?idt=105"
    },
    "-MHKm2ZRcbHZXBYOCNQm": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-07-28 11:31:16",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Expérience souhaitée",
      "id": "17446_0",
      "location": "Les Avenières Veyrins-Thuellin",
      "position": "<p>Nous recherchons pour notre client, entreprise familiale spécialisée dans le&nbsp;gros oeuvre, un manoeuvre BTP (F/H).</p><p><br></p><p>Vos différentes missions seront:</p><p>. Préparer les matériaux,&nbsp;les outils et l’espace d’intervention (mur, terrain, sol, etc.). </p><p>. Approvisionner le chantier.</p><p>. Transporter le matériel.</p><p>. Effectuer des coffrages simples et du décoffrage.</p><p>. Mettre en place des étaiements, des éléments de ferraillage et couler de petits ouvrages en béton. </p><p>. Nettoyer le chantier pendant et après les travaux.</p>",
      "postcode": "38630",
      "profile": "<p>Vous justifiez d'une première expérience dans le BTP</p><p>Vous avez un bon esprit d'équipe&nbsp;</p><p>Postulez !</p><p>Nous reviendrons vers vous rapidement</p>",
      "rome": "F1704",
      "salary": "A définir suivant profil",
      "title": "Manoeuvre BTP (F/H) - H/F",
      "url": "https://genesis.softy.pro/offre/17446?idt=105"
    },
    "-MHKm2_yppqqSwDm6V9m": {
      "contract_type": "CDI",
      "country": "France",
      "date": "2020-07-27 16:56:50",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Expérience exigée",
      "id": "17421_0",
      "location": "",
      "position": "<p>Principales missions :&nbsp;</p><p>- Assurer l'élaboration et la mise en oeuvre du projet de soins</p><ul><li>Elaborer le projet de soins en collaboration avec le MEDEC et sous l'autorité du directeur</li><li>Rédiger et actualiser les protocole de soins</li><li>Piloter les projets d'amélioration continue de la qualité des soins</li><li>Organiser et animer des actions collectives et individuelles pour interroger la pratique des soignants et assurer une prise en charge bienveillante des résidents.</li></ul><p>- Assurer la continuité et la qualité des soins et manager une équipe&nbsp;&nbsp;(env : 30 personnes)</p><ul><li>Recruter les meilleurs profils et s'assurer de la bonne intégration des nouveaux collaborateurs</li><li>Informer et expliquer pour intégrer l'équipe à la vie de l'établissement</li><li>Organiser les soins par&nbsp;une répartition équitable de la charge de travail au sein de l'équipe</li><li>Elaborer des plannings et savoir en déléguer la gestion quotidienne</li><li>Contrôler la qualité du travail, évaluer et accompagner les collaborateurs dans leur développement</li><li>Former les collaborateurs en collaboration avec le MEDEC (notamment à l'aide de formations de simulation)</li><li>Dynamiser l'équipe en confiant des responsabilités aux collaborateurs</li><li>Mettre en place une culture de Bientraitance et être attentif à tout acte considéré comme maltraitant&nbsp;</li><li>Contrôler la qualité des conditions de travail de l'équipe</li><li>Animer des réunions d'information/transmission, animer ou participer aux réunions de PVI</li><li>Mettre en place le même management, accompagnement et suivi de l'équipe de jour pour l'équipe de nuit</li></ul><p>- Participer à la pérennité et au rayonnement de l'établissement</p><ul><li>Mettre en place la gestion courante et prévisionnelle des matériels et des stocks</li><li>Contrôler la bonne utilisation des matériels par l'équipe ainsi que son entretien courant</li><li>Contrôler la sécurisation de la pharmacie, les dépenses en dispositifs médicaux et en masse salariale</li><li>En cas d'écart constaté, mettre en place les actions correctives nécessaires</li><li>Développer des partenariats avec les structures environnantes, les IFSI (afin d'accueillir des stagiaires)</li><li>Communiquer régulièrement avec les familles des résidents afin de sécuriser la prise en charge et fluidifier les relations avec l'établissement.</li><li>Expliquer la politique de soins par le biais de visites d'établissement et de rendez-vous de pré admission</li><li>Gérer les relations internes&nbsp;(l'ensemble du personnel de l'établissement) et les relations externes&nbsp;(résidents, familles, l'ensemble des acteurs de la prise en charge)</li></ul>",
      "postcode": "",
      "profile": "<p>La personne recherchée doit être titulaire d'un Diplôme d'Etat d'Infirmier + Formation continue au management.</p><ul><li>Posée</li><li>Autonome</li><li>Positive</li><li>Réfléchie</li></ul><p>Expérience requise : 1ère expérience significative d'IDE en EHPAD<br></p>",
      "rome": "J1506",
      "salary": "De 2920 €/mois à 3200 €/mois",
      "title": "Infirmier Diplômé d'Etat Coordinateur - H/F",
      "url": "https://genesis.softy.pro/offre/17421?idt=105"
    },
    "-MHKm2aOI7YBJs66GBLW": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-07-24 15:45:25",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Expérience souhaitée",
      "id": "17392_0",
      "location": "Bourgoin-Jallieu",
      "position": "<p>Genesis RH recherche, pour l'un de ses clients, un terrassier (F/H).</p><p>Vos différentes missions seront:</p><p>. Creuser des fondations ou des tranchées sur un terrain</p><p>. Utilisation d'outils en fonction du chantier: manuels et&nbsp;engins&nbsp;(bulldozer&nbsp;et niveleuse)</p><p>. Préparation du béton</p><p>. Installation des revêtements : gravier et/ou&nbsp;bitume</p>",
      "postcode": "38300",
      "profile": "<p>Ce métier demande force physique et résistance aux différentes températures !</p><p>Vous aimez travailler en extérieur ?</p><p>Vous êtes motivé(e) et autonome ?</p><p>Vous avez l'esprit d'équipe ?</p><p>N'hésitez pas et postulez dès à présent</p><p><br></p>",
      "rome": "F1704",
      "salary": "A définir suivant profil",
      "title": "TERRASSIER - H/F",
      "url": "https://genesis.softy.pro/offre/17392?idt=105"
    },
    "-MHKm2bylJ6s6jpgytU4": {
      "contract_type": "CDI",
      "country": "France",
      "date": "2020-07-24 14:20:57",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Débutant accepté",
      "id": "17390_0",
      "location": "Le Creusot",
      "position": "<p>Nous recherchons pour un de nos clients spécialisé dans le secteur d'activité de la construction de réseaux électriques haute tension et de télécommunications, un Aide Conducteur de Travaux. Il s'agit d'une création de poste avec une volonté de monter en compétences vers un poste de conducteur de travaux.&nbsp;</p><p>Vos missions seront les suivantes :&nbsp;&nbsp;</p><p>Vous accompagnez le conducteur de travaux sur ses missions, après une période de formation vous travaillerez en totale autonomie et vous vous déplacerez sur les chantiers sur le périmètre national.&nbsp;</p><p>Plus précisément vous :</p><p>&nbsp;1) Effectuez les opérations préalables&nbsp;</p><ul><li>Obtenir les autorisations préalables aux interventions avec les différentes parties concernées (exploitants de réseaux, mairies, services autoroutes ...)&nbsp;</li><li>Réaliser l'état des lieux avant intervention&nbsp;&nbsp;</li><li>Rechercher les sites propices et réaliser les installations de chantier&nbsp;&nbsp;</li><li>Rechercher les sous traitants et prestataires de services locaux&nbsp;&nbsp;</li></ul><p>2) Participez à la réalisation du chantier et effectuer les replis</p><ul><li>Effectuer les contrôles topographiques (réglages de câbles, verticalité des pylônes...)&nbsp;</li><li>Coordonner les interventions sur chantier.&nbsp;&nbsp;</li><li>Suivre les retraits des aménagements provisoires&nbsp;&nbsp;</li><li>Réaliser l'état des lieux après interventions&nbsp; &nbsp;</li><li>Retirer les installations du chantier.&nbsp;&nbsp;</li></ul>",
      "postcode": "71200",
      "profile": "<p>Nous recherchons une personne ayant un bon sens relationnel et une capacité d'adaptation et d'intégration au sein d'une équipe.&nbsp;&nbsp;Vous savez être à l'écoute et imposer vos décisions en étant conciliant et compréhensif.&nbsp;&nbsp;</p><p>Vous êtes organisé, vous pouvez enregistrer de nombreuses informations. Vous êtes rigoureux, et efficace.&nbsp;&nbsp;Vous justifiez d'une formation type BTS travaux publics/Bâtiment/étude la construction/DUT Génie civil. </p><p>Vous avez une première expérience sur un poste similaire.&nbsp;Vous savez utiliser des appareils topographiques type Tachéomètre et Station topographique.&nbsp;&nbsp;</p><p>Alors vous correspondez au candidat idéal pour le poste!Postulez dès à présent à notre offre et nous serons heureux de réaliser un entretien avec vous!</p>",
      "rome": "F1201",
      "salary": "De 2020 €/mois à 2980 €/mois",
      "title": "Aide Conducteur de Travaux - H/F",
      "url": "https://genesis.softy.pro/offre/17390?idt=105"
    },
    "-MHKm2cRcSpuoYJl-EBG": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-07-24 09:09:46",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Expérience souhaitée",
      "id": "17384_0",
      "location": "Mâcon",
      "position": "<p>Nous recherchons pour un de nos clients spécialisé dans la construction de travaux souterrains de tous types (fluides, fibre optique) un chauffeur poids lourd/ manoeuvre sur chantier.</p><p><br></p><p>Vos missions seront de :</p><p>- Conduire le poids lourd (30%)</p><p>- Manoeuvre (70%)</p><p>- Chargement et déchargement de matériaux</p><p>- Transport et livraison de matériaux sur chantiers</p><p>- Respect du trajet et du planning prévu</p><p>- Respect des règles d'hygiène et de sécurité, code de la route et du port des EPI.</p><p><br></p><p>35h/ semaine du Lun au Ven .</p><p><br></p><p>10% IFM + 10% ICP</p>",
      "postcode": "71000",
      "profile": "<p>Nous recherchons un chauffeur PL ayant la capacité de conduire mais également de travailler sur le chantier en tant que manoeuvre.</p><p>Nous recherchons une personne dynamique et volontaire.</p><p>CQC&nbsp;obligatoire+ Permis C.</p><p><br></p><p>Candidatez dès à présent!! ou appelez nous au 03.85.20.30.00</p>",
      "rome": "N4101",
      "salary": "A définir suivant profil",
      "title": "CONDUCTEUR PL TP /MANOEUVRE - H/F",
      "url": "https://genesis.softy.pro/offre/17384?idt=105"
    },
    "-MHKm2cw8lNevCM_PrmD": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-07-22 15:36:23",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Expérience souhaitée",
      "id": "17350_0",
      "location": "Saint-Quentin-Fallavier",
      "position": "<p>Dans le cadre de son développement, Notre Client&nbsp;recherche un(e) conducteur d’engins H/F.</p><p> Vous travaillerez au sein d'une carrière sous l’autorité du chef de carrière, </p><p>Vos missions principales seront : </p><p>- Conduire et manipuler      une chargeuse à pneu ; </p><p>- Approvisionner en      granulats et sables les trémies à partir des airs de stockage ; </p><p>- Effectuer le chargement      clients ; </p><p>- Effectuer les réglages      des engins pour leur utilisation ; </p><p>- Être responsable de la      propreté du matériel que vous utilisez. </p><p>- Remplacer l'agent      Bascule  Déstockage des trémies      de l’installation avec un dumper</p><p>- Surveiller      l’installation de production et veiller à son bon fonctionnement </p><p>- Réaliser les opérations      de maintenance courante </p><p>- Travail en poste :&nbsp;&nbsp;5-13 ou 13-21h 10 mois dans l’année, le restant en journée pour la maintenance</p><p>  <br></p>",
      "postcode": "38070",
      "profile": "<p>Vous avez une première expérience en conduite de chargeuse. </p><p>Vous êtes issu(e) d’une formation CAP/BEP conduite d’engins et vous possédez au moins le CACES R372 type 4 et 8. </p><p>Vous êtes solide, autonome et rigoureux. </p><p>Vous avez de réelle capacité d’organisation.</p><p>Cette offre est pour vous ! Postulez et nous reviendrons vers vous rapidement.<br></p>",
      "rome": "F1302",
      "salary": "12 €/heure",
      "title": "CONDUCTEUR D'ENGINS- H/F - H/F",
      "url": "https://genesis.softy.pro/offre/17350?idt=105"
    },
    "-MHKm2dUSW-rlMnwnhGx": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-07-21 17:26:34",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Expérience exigée",
      "id": "17316_0",
      "location": "Charolles",
      "position": "<p>Nous recherchons pour notre client une entreprise de rénovation un plaquiste confirmé pour une mission de 2 mois minimum</p><p>C'est une entreprise familiale avec une dynamique de développement et un savoir faire reconnu.</p><p><br></p><p>Vous serez en charge de :</p><p>Pose des panneaux préfabriqués (agglomérés, stratifiés, placoplâtre, métal, plastique, etc.)</p><p>Montage des cloisons, des sols, des doublages en panneaux ou des faux plafonds.&nbsp;</p><p>Mise en place des huisseries, des encadrements et des montants.&nbsp;</p><p>Jointure et renforcement de la structure des panneaux.</p><p>Correction éventuelle de l’équerrage et l’aplomb des murs ou l’horizontalité des sols.</p><p><br></p><p><br></p>",
      "postcode": "71120",
      "profile": "<p>Vous justifiez déjà&nbsp;d'une belle expérience en tant que plaquiste.</p><p>Vous êtes autonome, polyvalent et vous souhaitez&nbsp;intégrer une entreprise au savoir faire reconnu.&nbsp;</p><p>Alors postulez dès à présent !!</p><p><br></p><p><br></p>",
      "rome": "F1604",
      "salary": "13 €/heure",
      "title": "Plaquiste - H/F",
      "url": "https://genesis.softy.pro/offre/17316?idt=105"
    },
    "-MHKm2fHoCdZehxBwmM7": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-07-21 15:20:56",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Expérience souhaitée",
      "id": "17312_0",
      "location": "Bourgoin-Jallieu",
      "position": "<p>Nous recherchons un conductezur SPL H/F afin de palier au congés d'Eté du personnel de notre client, entreprise de recyclage de palettes. Vos misisons seront les suivantes :</p><p>- conduite ampliroll</p><p>- livraison sur plateau</p><p>- bachage/debachage</p><p>- sanglage</p><p>- tournées parfois avec remorque également</p><p>Secteur de livraisons&nbsp; + ramasses = région Auvergne Rhone Alpes.<br></p>",
      "postcode": "38300",
      "profile": "<p>Vous êtes polyvalent(e) , rigoureux(se) et soigneux(se),</p><p>Vous êtes à l'aise en conduite poids lourd et vous savez manoeuvrer avec remorque,</p><p>Postulez ! Nous reviendrons vers vous rapidement.<br></p>",
      "rome": "N4101",
      "salary": "11 €/heure",
      "title": "Conducteur SPL - H/F",
      "url": "https://genesis.softy.pro/offre/17312?idt=105"
    },
    "-MHKm2foLRj0Bs-VSJxW": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-07-21 14:07:24",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Expérience souhaitée",
      "id": "17307_0",
      "location": "Mâcon",
      "position": "<p>Nous recherchons pour un de nos clients spécialisé dans les travaux de peintures un peintre industriel(le) pistolet pour démarrage dès que possible.</p><p>L'entreprise effectue divers travaux de sablage, grenaillage et polissage sur site ou atelier.</p><p><br></p><p>Vos missions seront de :</p><p>- Peindre avec de la peinture liquide au pistolet&nbsp;</p><p>- Réaliser des joints&nbsp;</p><p>- Effectuer divers travaux manutention</p><p><br></p><p>Possibilité longue mission.</p><p>Horaire 35h du Lundi au Vendredi.</p><p>Salaire à&nbsp;définir selon votre profil et expérience.</p><p><br></p><p>Avantage interim : 10% IFM + 10% ICP</p><p><span><br></span></p>",
      "postcode": "71000",
      "profile": "<p>Nous recherchons un profil ayant déjà une expérience dans le domaine.</p><p>Nous recherchons une personne motivée, déterminée à&nbsp;rester dans une entreprise aux valeurs familiales.</p><p><br></p><p>Alors candidatez dès à présent à cette offre ou appelez nous au 03.85.20.30.00</p>",
      "rome": "H3404",
      "salary": "12 €/heure",
      "title": "PEINTRE INDUSTRIEL PISTOLET - H/F",
      "url": "https://genesis.softy.pro/offre/17307?idt=105"
    },
    "-MHKm2gLh8uPANnHCPYV": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-07-20 17:55:32",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Expérience souhaitée",
      "id": "17288_0",
      "location": "Coublevie",
      "position": "<p>Votre agence Genesis RH recherche, pour son client, une M.A.S, un Infirmier Diplômé&nbsp;d'Etat H/F.</p><p>Vos missions seront :</p><p>.Organiser/ Prodiguer des soins aux patients sous prescription médicale</p><p>.Analyser les besoins de la personne en soin et adapter sa prise en charge</p><p>.Gérer la partie administrative (les plannings&nbsp;de soins..)</p><p>.Veiller au bien-être physique et moral des patients</p>",
      "postcode": "38500",
      "profile": "<p>Vous êtes infirmier(e) diplômé(e) d'Etat</p><p>Vous avez un bon relationnel&nbsp;&nbsp;</p><p>Vous êtes motivé(e) et autonome&nbsp;</p><p>Alors cette mission&nbsp;est faite pour vous ! Postulez !</p>",
      "rome": "J1502",
      "salary": "18 €/heure",
      "title": "INFIRMIER - H/F",
      "url": "https://genesis.softy.pro/offre/17288?idt=105"
    },
    "-MHKm2iNSWtyMrOtm9DH": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-07-20 17:23:05",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Expérience souhaitée",
      "id": "17287_0",
      "location": "Saint-Quentin-Fallavier",
      "position": "<p>Votre agence Genesis RH recherche, pour son client, Transporteur National basé à St Quentin Fallavier, un chauffeur PL frigo H/F.</p><p>Vos missions seront :</p><p>.Chargement/ Déchargement du camion frigorifique</p><p>.Livraisons&nbsp;auprès de professionnels de la restauration</p><p><br></p><p>Départ de l'entrepôt à 4H00 et retour à&nbsp;14H00.</p><p><br></p>",
      "postcode": "38070",
      "profile": "<p>Autonome et motivé, vous avez un bon relationnel avec la clientèle,</p><p>Alors ce poste est fait pour vous !</p><p>Postulez et nous reviendrons vers vous rapidement.</p>",
      "rome": "N4101",
      "salary": "10 €/heure",
      "title": "Chauffeur PL frigo - F/H - H/F",
      "url": "https://genesis.softy.pro/offre/17287?idt=105"
    },
    "-MHKm2iuIdBxWsHdP8Da": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-07-20 16:51:42",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Expérience souhaitée",
      "id": "17285_0",
      "location": "Vaugneray",
      "position": "Nous recherchons pour notre client, EHPAD de 92 résidents, un Infirmier Diplômé(e) d 'Etat, afin de palier aux absences du personnel interne.",
      "postcode": "69670",
      "profile": "<p>Horaire 7h30 / 19h dont 1h30 de pause.</p><p>7h 30 relève avec l'équipe de nuit. </p><p>8h : organisation et distribution des rôles aux équipes aides soignantes, vérifier si absence de collaborateur et appeler agence intérim si c'est le cas, ou bien voir avec la cadre d'astreinte si en semaine.</p><p>8h 10 : préparer les morphiniques.</p><p>8h 25 ==&gt; 9h 45 : tour IDE (distribution traitement) </p><p>9h 45 / 10h : pause 10h jusqu'à 11h30 : pansements </p><p>11h30 préparation des traitements, et distribution jusqu'à 13h. </p><p>13h à 14h 1 inf va en pause, l'autre prépare les piluliers pour toute la semaine de 12 résidents définis selon un protocole par jour. </p><p>14h à 15h : pause de l'autre IDE, l'autre IDE finit les piluliers ou bien fait les collations de la semaine, les traitements de nuit... </p><p>15h / 15h30 relève avec les soignants.</p><p> 15h 30 distribution des traitements de 16h + finir les pansements.</p><p> 17h tour, répondre aux visites des familles, aux appels, gérer les aléas, absence de personnel, blessure.... </p><p>17h30 distribution des médicaments, et tour complet auprès des résidents. </p><p>18h30 : transmissions sur le logiciel Net Soins. &nbsp;</p><p> 19h : départ. &nbsp; &nbsp; </p><p>Equipe :  2 IDE 8 AS 3 ASH 1 secrétaire</p>",
      "rome": "J1502",
      "salary": "18 €/heure",
      "title": "INFIRMIER DIPLOME D'ETAT - H/F",
      "url": "https://genesis.softy.pro/offre/17285?idt=105"
    },
    "-MHKm2jWdqIGl6fw7lfl": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-07-20 15:59:42",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Expérience souhaitée",
      "id": "17283_0",
      "location": "Bourgoin-Jallieu",
      "position": "<p>Nous recherchons pour notre client, EHPAD en région Auvergne-Rhone-alpes, un(e) Aide Soignant(e) Diplômé(e).</p><p>Disponibilités sur plusieurs jours :</p><p>Horaires 7h30 / 19h dont 1h30 de pause.&nbsp; </p><p>7h30 relève avec l'équipe de nuit. </p><p>8h : organisation avec IDE</p><p>Equipe :  2 IDE 8 AS 3 ASH 1 secrétaire /&nbsp; 92 résidents.</p>",
      "postcode": "38300",
      "profile": "<p>Vous êtes Diplômé(e) Aide Soignant(e).</p><p>N'hésitez pas à postuler nous reviendrons vers vous rapidement.<br></p>",
      "rome": "J1501",
      "salary": "15 €/heure",
      "title": "AIDE SOIGNANT - H/F",
      "url": "https://genesis.softy.pro/offre/17283?idt=105"
    },
    "-MHKm2k40UEioGal3xIZ": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-07-20 11:56:53",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Expérience exigée",
      "id": "17278_0",
      "location": "Puget-sur-Argens",
      "position": "<p>Nous recherchons pour notre client, entreprise de forage, un Projeteur Béton H/F pour une mission située sur Puget sur Argens.</p><p>Mission à pourvoir rapidement.</p><p>Grand déplacement.</p>",
      "postcode": "83480",
      "profile": "<p>Vous justifiez&nbsp;d'une mission significative dans le forage et vous êtes autonome en projetage de béton.</p><p>Postulez ! Nous reviendrons vers vous rapidement.</p>",
      "rome": "F1104",
      "salary": "10 €/heure",
      "title": "PROJETEUR BETON - H/F",
      "url": "https://genesis.softy.pro/offre/17278?idt=105"
    },
    "-MHKm2mQXtQM40VlyAcf": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-07-16 17:33:20",
      "description": "Genesis RH, ce n'est pas qu'une agence intérim. C'est avant tout une équipe dynamique et à l'écoute. Notre priorité : vous trouver au plus vite un emploi qui répondra à vos envies. Travail temporaire, CDD et CDI, nous vous trouvons dans les meilleurs délais une entreprise qui partage vos valeurs et votre vision du monde professionnel.",
      "experience": "Expérience exigée",
      "id": "17236_0",
      "location": "Mâcon",
      "position": "<p>Nous recherchons pour notre client&nbsp;un&nbsp;chaudronnier H-F. </p><p>Vous serez amené à réaliser l'ensemble de la pièce en totale autonomie de la Lecture de plans au produit fini.</p><p>Vos missions seront donc les suivantes :</p><p>- Lecture de plans</p><p>- Création de pièces</p><p>- Utilisation des différents outils : (Plieuse,&nbsp;Presse plieuse,&nbsp;Cisaille guillotine,Tour vertical,&nbsp;Tour horizontal, Poste à souder TIG,&nbsp;Poste à souder MIG-MAG,&nbsp;Scie à ruban,&nbsp;Poinçonneuse,&nbsp;Découpe plasma).</p><p><br></p><p>Les postes à pourvoir sont à 39h base hebdo.&nbsp;</p><p><br></p><p><br></p><p>&nbsp;</p><p><br></p><p><br></p><p><br></p>",
      "postcode": "71000",
      "profile": "<p>Nous recherchons pour notre client spécialisé en chaudronnerie industrielle un profil : Chaudronnier avec une expérience dans ce domaine.</p><p>Nous recherchons une personne motivée, travaillant en autonomie.</p><p><br></p><p><br></p><p><br></p><p><br></p>",
      "rome": "H2902",
      "salary": "15 €/heure",
      "title": "Chaudronnier - H/F",
      "url": "https://genesis.softy.pro/offre/17236?idt=105"
    },
    "-MHKm2n-Pa2s_iyFmWkn": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-07-10 09:10:03",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Débutant accepté",
      "id": "17112_0",
      "location": "Izeaux",
      "position": "<p>Votre agence Genesis RH de BOURGOIN-JALLIEU recherche pour l'un de ses clients un chauffeur benne TP PL/SPL (F/H).</p><p><br></p><p>Vos missions consisteront à:</p><p>- Conduire un camion benne</p><p>- Approvisionner le(s) chantier(s)<br></p>",
      "postcode": "38140",
      "profile": "<p>Vous êtes chauffeur PL/SPL ?</p><p>Vous souhaitez intégrer le monde du TP ?</p><p>Vous êtes autonome et rigoureux ?</p><p>CE POSTE EST FAIT POUR VOUS !!</p><p>Alors rejoignez vite l'équipe Genesis RH.<br></p><p><br></p>",
      "rome": "N4101",
      "salary": "A définir suivant profil",
      "title": "Chauffeur benne TP PL/SPL (F/H)",
      "url": "https://genesis.softy.pro/offre/17112?idt=105"
    },
    "-MHKm2nbCr8cb3659AYf": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-07-09 15:44:17",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Expérience souhaitée",
      "id": "17101_0",
      "location": "Mâcon",
      "position": "<p><span>Votre agence Genesis RH de Mâcon recherche pour notre client dans le bâtiment et travaux de gros oeuvre, un Maçon Coffreur H/F.</span></p><p><span>Vos missions seront les suivantes :</span></p><p><span>- Placer les échafaudages et les dispositifs de sécurité. </span></p><p><span>- Prévoir&nbsp;la quantité de béton, bois, fers d’armature et les autres matériaux nécessaires. </span></p><p><span>- Réceptionner et stocker les matériaux. </span></p><p><span>- Assembler les boisages pour en faire des moules : les coffrages étanches qui vont contenir le béton. </span></p><p><span>- Réserver les emplacements nécessaires à l’installation des canalisations. </span></p><p><span>- Placer les barres d’étais qui maintiennent le serrage du coffrage. </span></p><p><span>- Insérer l’armature de fer à l’intérieur du coffrage si le béton doit être armé. </span></p><p><span>- S’assurer du calage de l’ouvrage et de son étanchéité.</span></p><p><span>- Superviser l’opération nécessitant une grue pour le positionnement du coffrage. </span></p><p><span>- Décoffrer l’ensemble quand le béton est sec.&nbsp;</span></p><p><br></p>",
      "postcode": "71000",
      "profile": "<p><span>Vous êtes autonome, soigné et rigoureux.</span></p>  <p><span>Vous avez le sens de l’initiative et du travail en équipe.</span></p>  <p><span>&nbsp;</span></p>  <p><span>Vous maîtrisez les différentes techniques de ferraillage, de coulage du béton, de bétonnage. Vous savez lire des plans et des schémas, vous maîtrisez l’équerrage et vous savez monter les banches.</span></p>",
      "rome": "F1703",
      "salary": "13 €/heure",
      "title": "MACON COFFREUR - H/F",
      "url": "https://genesis.softy.pro/offre/17101?idt=105"
    },
    "-MHKm2oBPwVuerMcxfh5": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-07-09 11:16:58",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Expérience exigée",
      "id": "17076_0",
      "location": "Mâcon",
      "position": "<p>Votre agence Genesis RH de Mâcon recherche un Chef applicateur d'enrobé H/F pour une entreprise Maconnaise de TP</p><p><br></p><p>Vous aurez en charge :&nbsp;</p><p> </p><p>Encadrement de l'équipe d'applicateur d'enrobé</p><p>Réalisation d'ouvrages liés à la construction ou à la réfection de routes, chaussées (enrobés, ...), et de leurs dépendances (bordures, trottoirs, caniveaux,...) selon les règles de sécurité.</p><p>Mise en oeuvre des moyens permettant d'assurer la tenue des délais et du respects des normes de sécurité</p><p>Aide à l'exécution des travaux manuels (émulsions, bitumes, asphaltes, enrobés)</p>",
      "postcode": "71000",
      "profile": "Vous avez une première expérience réussie en encadrement d'équipe dans le domaine des TP",
      "rome": "F1702",
      "salary": "15 €/heure",
      "title": "CHEF APPLICATEUR D ENROBE - H/F",
      "url": "https://genesis.softy.pro/offre/17076?idt=105"
    },
    "-MHKm2uO7GYZ3_wRxTp0": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-07-09 10:59:58",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Expérience souhaitée",
      "id": "17075_0",
      "location": "Arnas",
      "position": "<p>Votre agence Genesis RH de Mâcon, recherche un conducteur de compacteur H-F pour son client, une entreprise de TP de grande envergure.&nbsp;</p><p>Dans le cadre de la réalisation de nouveaux aménagements, vous serez en charge de :</p><p>- Compactage des sols</p><p>- Conduite et entretien courant de votre compacteur</p><p>- Possible aide au sol</p><p>- Respect des règles de sécurité</p>",
      "postcode": "69400",
      "profile": "<p>Vous êtes titulaire du CACES 7 et avez déjà une expérience sur un poste similaire.&nbsp;</p><p>Vous vous intégrez rapidement à l'équipe et êtes autonome.&nbsp;<br></p>",
      "rome": "F1302",
      "salary": "A définir suivant profil",
      "title": "CONDUCTEUR DE COMPACTEUR - H/F",
      "url": "https://genesis.softy.pro/offre/17075?idt=105"
    },
    "-MHKm2v-BhdXYVfwvfeQ": {
      "contract_type": "CDI",
      "country": "France",
      "date": "2020-07-08 11:35:24",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Expérience souhaitée",
      "id": "17039_0",
      "location": "Paray-le-Monial",
      "position": "<p>Nous recherchons pour un de nos clients spécialisé dans les travaux publics un conducteur de pelle à chenille pour un poste en CDi.</p><p><br></p><p>Cette entreprise est&nbsp;un acteur majeur de la création de réseau d'acheminement de l'énergie (électricité, gaz), des fluides (eau potable, assainissement) et des données (télécommunications, fibre optique) au travers de ses nombreuses réalisation.</p><p><br></p><p>Sous la responsabilité du chef de chantier, vous participerez aux travaux de pose de canalisation.</p><p><br></p><p><br></p>",
      "postcode": "71600",
      "profile": "<p><span>Vous êtes issu de formation CAP ou BAC PRO en conduite d'engins TP.</span></p><p><span>Vous avez déjà une expérience dans la conduite d'engins pelle à chenille ou à pneu. Vous détenez le CACES 2 à jour.</span></p><p><span>Vous êtes dynamique, autonome et souhaitez évoluer dans une entreprise.&nbsp;</span></p><p><span>Alors candidatez dès à présent à cette offre!!</span></p><p><br></p><p><span>Rémunération à définir selon expérience .</span></p>",
      "rome": "F1302",
      "salary": "13 €/heure",
      "title": "CONDUCTEUR DE PELLE A CHENILLE - H/F",
      "url": "https://genesis.softy.pro/offre/17039?idt=105"
    },
    "-MHKm2vcviHxHoHJSXTB": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-07-01 14:50:36",
      "description": "Genesis RH, ce n'est pas qu'un cabinet de placement.  C'est avant tout une équipe dynamique et à l'écoute. Notre priorité : vous trouver au plus vite un emploi qui répondra à vos envies.  Travail temporaire, CDD et CDI, nous vous trouvons dans les meilleurs délais une entreprise qui partage vos valeurs et votre vision du monde professionnel.",
      "experience": "Expérience souhaitée",
      "id": "16859_0",
      "location": "Mâcon",
      "position": "<p>Nous recherchons un(e) chef de chantier BTP H/F pour un de nos clients dans le secteur du Mâconnais.</p><p>Vos missions seront de : </p><p> • Identifier les moyens techniques, matériels et financiers à partir des plans d'exécution de chantier et optimiser les modes opératoires </p><p>• Planifier l'activité des personnels et les affecter sur les postes </p><p>• Présenter le chantier, son planning, le mode constructif de l'ouvrage et les consignes aux intervenants. </p><p>• Définir l'implantation et la sécurisation du chantier et les zones de stockage </p><p>• Contrôler l'approvisionnement des fournitures, des matériels et des matériaux de construction </p><p>• Suivre et contrôler l'avancement et la conformité des réalisations en fonction du plan d'exécution </p><p>• Apporter un appui technique aux chefs d'équipe et déterminer la mobilité et la formation </p><p>• Renseigner les supports de suivi d'activité du chantier, analyser les données</p><p><br></p><p>Poste à pourvoir immédiatement en 35h.</p><br>",
      "postcode": "71000",
      "profile": "<p>Nous recherchons une personne expérimentée, impliquée et autonome pour gérer un chantier.</p><p> SAVOIR ETRE :- force de proposition - leader - diplomate - réactif</p><p>Alors candidatez dès maintenant!<br></p>",
      "rome": "F1202",
      "salary": "15 €/heure",
      "title": "CHEF DE CHANTIER  - H/F",
      "url": "https://genesis.softy.pro/offre/16859?idt=105"
    },
    "-MHKm2wFXMSIrf_JbXma": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-07-01 10:20:42",
      "description": "Genesis RH, ce n'est pas qu'une agence intérim. C'est avant tout une équipe dynamique et à l'écoute. Notre priorité : vous trouver au plus vite un emploi qui répondra à vos envies. Travail temporaire, CDD et CDI, nous vous trouvons dans les meilleurs délais une entreprise qui partage vos valeurs et votre vision du monde professionnel.",
      "experience": "Expérience souhaitée",
      "id": "16843_0",
      "location": "Mâcon",
      "position": "<p><span>Nous recherchons pour un de nos clients, spécialisé dans les carrières&nbsp;&nbsp;un(e) Pilote d'installation H/F.<br> Vous travaillerez au sein d'une carrière, sous l’autorité du chef de carrière, vos missions principales seront :</span></p>  <p><span>&nbsp;</span></p>  <ul type=\"disc\">  <li><span>Réaliser la production</span></li> </ul>  <ul type=\"disc\">  <li><span>Contrôler les outillages      de la machine</span></li> </ul>  <ul type=\"disc\">  <li><span>Surveiller      l’installation et le déroulement des opérations réalisées par les machines      (ronde). </span></li> </ul>  <ul type=\"disc\">  <li><span>Repérer les dérives      éventuelles des paramètres par rapport aux valeurs adéquates ou les      déréglages. </span></li> </ul>  <ul type=\"disc\">  <li><span>Détecter les incidents      et anomalies survenant sur les installations et intervenir ou faire appel      au service compétent en cas de problème. </span></li> </ul>  <ul type=\"disc\">  <li><span>Contrôler et ajuster les      réglages en cours de fabrication. </span></li> </ul>  <ul type=\"disc\">  <li><span>Remplir les chiffres de      production mensuellement et tenir un suivi de maintenance et d’entretien      de l’installation. </span></li> </ul>  <ul type=\"disc\">  <li><span>Assurer les opérations      de maintenance courantes et d’entretien préventif</span></li> </ul>  <ul type=\"disc\">  <li><span>Nettoyage régulier de      l‘installation</span></li> </ul>  <ul type=\"disc\">  <li><span>Avoir      une expérience en Conduite d'engins de chantier (chargeuse, dumper,..)</span></li>  <li><span>Travail      en poste</span></li> </ul>  <p><span>&nbsp;</span></p>  <p><span>&nbsp;</span></p>  <p><span>20% conduite d’engins, 40% maintenance, 40% Production</span></p>  <p><br></p>",
      "postcode": "71000",
      "profile": "<p>Vous êtes issu d'une formation mécanique/maintenance.</p><p>Vous avez vos CACES 4.8 à jour. &nbsp;&nbsp;</p><p>Alors postulez sans plus attendre!</p>",
      "rome": "H2804",
      "salary": "A définir suivant profil",
      "title": "PILOTE D'INSTALLATION - H/F GRAND DEPLACEMENT",
      "url": "https://genesis.softy.pro/offre/16843?idt=105"
    },
    "-MHKm2yvDZA1VLOwwgqg": {
      "contract_type": "CDI",
      "country": "France",
      "date": "2020-06-30 17:20:19",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Expérience exigée",
      "id": "16839_0",
      "location": "Tarare",
      "position": "<p>Nous recherchons pour notre client, entreprise reconnue du secteur BTP, un commercial H/F.</p><p>Pour ce poste vous aurez une grande proximité terrain, une clientèle variée et vous serez sensibilisé aux connaissances en transport, affrêtement, afin d'optimiser les frais logistiques.</p><p>Vous serez rattaché(e) à votre responsable de filiale et un animateur commercial.</p><p>Vous gérerez votre activité de la prescription à la gestion administrative,&nbsp;jusqu'à la relance client.</p><p>Basé(e) à Roanne, vous interviendrez sur l'Ouest du Rhône et une partie de&nbsp;la Loire et Beaujolais.<br></p><p><br></p>",
      "postcode": "69170",
      "profile": "<p>Vous avez une culture BTP,&nbsp;</p><p>Vous êtes ouvert d'esprit,</p><p>Philanthrope,</p><p>et vous avez un profil technico-commercial,</p><p>Postulez ! Nous vous contacterons rapidement.</p><p><br></p>",
      "rome": "D1407",
      "salary": "A définir suivant profil",
      "title": "COMMERCIAL - H/F",
      "url": "https://genesis.softy.pro/offre/16839?idt=105"
    },
    "-MHKm2z_hwtHreSJqgS3": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-06-30 15:13:54",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Expérience souhaitée",
      "id": "16828_0",
      "location": "Bourgoin-Jallieu",
      "position": "<p>Notre client, petite entité spécialisée dans la géothermie et faisant partie d'un groupe, recherche un aide foreur avec le permis SPL (CE).</p><p>En effet, la mission sera avant tout d'aider le foreur sur le chantier et d'acheminer les matériaux et marchandises nécessaires d'un chantier à un autre, grâce à un véhicule poids lourd + remorque.</p><p>- Mission en Grand déplacement (découchés à la semaine)</p><p>- Sur toute la région Auvergne-Rhone-Alpes.</p>",
      "postcode": "38300",
      "profile": "<p>Personne de terrain</p><p>Esprit d'équipe</p><p>Respect du code de la route et des consignes de sécurité</p>",
      "rome": "F1401",
      "salary": "13 €/heure",
      "title": "CONDUCTEUR SPL FORAGE - H/F",
      "url": "https://genesis.softy.pro/offre/16828?idt=105"
    },
    "-MHKm3-Eti4iphj1EVYd": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-06-30 14:57:42",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Expérience souhaitée",
      "id": "16825_0",
      "location": "Bourgoin-Jallieu",
      "position": "<p>Notre client, petite entité spécialisée dans la géothermie et faisant partie d'un groupe, recherche un aide foreur avec le permis SPL (CE).</p><p>En effet, la mission sera avant tout d'aider le foreur sur le chantier et d'acheminer les matériaux et marchandises nécessaires d'un chantier à un autre.</p><p>Mission en Grand déplacement (découchés à la semaine)</p><p>Sur toute la région Auvergne-Rhone-Alpes.</p>",
      "postcode": "38300",
      "profile": "<p>Personne de terrain</p><p>Esprit d'équipe</p><p>Respect du code de la route et des consignes de sécurité</p>",
      "rome": "F1401",
      "salary": "13 €/heure",
      "title": "AIDE FOREUR PERMIS CE - H/F",
      "url": "https://genesis.softy.pro/offre/16825?idt=105"
    },
    "-MHKm32CDABeo5t81fNP": {
      "contract_type": "CDI",
      "country": "France",
      "date": "2020-06-29 16:44:00",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Expérience souhaitée",
      "id": "16792_0",
      "location": "Lyon",
      "position": "<p>Principales missions:</p><ul><li>Il élabore, avec le concours de l’équipe soignante,<span>&nbsp;</span>le projet général de soins, s’intégrant dans le projet d’établissement,<span>&nbsp;</span>et coordonne et évalue sa mise en œuvre.</li><li>Il donne un<span>&nbsp;</span>avis sur les admissions des personnes à accueillir<span>&nbsp;</span>en veillant notamment à la compatibilité de leur état de santé avec les capacités de soins de l’institution.</li><li>Il&nbsp; préside la commission de coordination gériatrique chargée d’organiser l’intervention de l’ensemble des professionnels salariés et libéraux au sein de l’établissement. Cette commission, dont les missions et la composition sont fixées par arrêté du ministre chargé des personnes âgées, se réunit au minimum deux fois par an. Le médecin coordonnateur informe le représentant légal de l’établissement des difficultés dont il a, le cas échéant, connaissance liées au dispositif de permanence des soins prévu aux articles R. 6315-1 à R. 6315-7 du code de la santé publique.</li><li>Il évalue et valide l’état de dépendance<span>&nbsp;</span>des résidents et leurs besoins en soins requis à l’aide des référentiels requis (AGGIR, PATHOS).<br></li><li>Il veille à l’application des bonnes pratiques gériatriques,<span>&nbsp;</span>y compris en cas de risques sanitaires exceptionnels, formule toute recommandation utile dans ce domaine et contribue à l’évaluation de la qualité des soins</li><li>Il contribue auprès des professionnels de santé exerçant dans l’établissement à la bonne adaptation aux impératifs gériatriques des prescriptions de médicaments, des produits et prestations (cf. article L. 165-1 du code de la sécurité sociale). Il élabore<span>&nbsp;</span>une liste, par classes, des médicaments à utiliser préférentiellement, en collaboration avec les médecins traitants des résidents, et, le cas échéant, avec le pharmacien chargé de la gérance de la pharmacie à usage intérieur ou le pharmacien de la PUI.</li><li>Il donne un avis sur le contenu et participe à la mise en œuvre de la ou des<span>&nbsp;</span>conventions conclues entre l’EHPAD et les établissements de santé<span>&nbsp;</span>au titre de la ainsi que sur le contenu et la mise en place, dans l’établissement, d’une organisation adaptée en cas de risques exceptionnels.<br><br></li><li>Il contribue à la mise en œuvre d’une politique de formation et participe aux actions d’information des professionnels de santé<span>&nbsp;</span>exerçant dans l’établissement.</li><li>Il élabore un<span>&nbsp;</span>dossier type de soins.</li><li>Il établit, avec le concours de l’équipe soignante, un rapport annuel d’activité médicale<span>&nbsp;</span>(RAMA) qu’il signe conjointement avec le directeur de l’établissement. Ce rapport retrace notamment les modalités de la prise en charge des soins et l’évolution de l’état de dépendance et de santé des résidents. Il est soumis pour avis à la commission de coordination gériatrique qui peut émettre à cette occasion des recommandations concernant l’amélioration de la prise en charge et de la coordination des soins. Dans ce cas, les recommandations de la commission sont annexées au rapport.<ul><li>Il collabore à la mise en œuvre de<span>&nbsp;</span>réseaux gérontologiques<span>&nbsp;</span>coordonnés, d’autres formes de coordination.<br></li><li>Il identifie les<span>&nbsp;</span>risques éventuels pour la santé publique<span>&nbsp;</span>dans les établissements et veille à la mise en œuvre de toutes mesures utiles à la prévention, la surveillance et la prise en charge de ces risques.<br><br></li><li>Il réalise des<span>&nbsp;</span>prescriptions médicales<span>&nbsp;</span>pour les résidents de l’établissement au sein duquel il exerce ses fonctions de coordonnateur en cas de<span>&nbsp;</span>situation d’urgence ou de risques vitaux<span>&nbsp;</span>ainsi que lors de la survenue de risques exceptionnels ou collectifs nécessitant une organisation adaptée des soins. Les médecins traitants des résidents concernés sont dans tous les cas informés des prescriptions réalisées.<br></li></ul><ul><li>Il élabore, après avoir évalué leurs risques et leurs bénéfices avec le concours de l'équipe médico-sociale, les<span>&nbsp;</span>mesures particulières<span>&nbsp;</span>comprises dans l'annexe au contrat de séjour (...) pour assurer l'intégrité physique et la sécurité de la personne et pour soutenir l'exercice de sa<span>&nbsp;</span>liberté d'aller et venir.</li></ul></li></ul>",
      "postcode": "",
      "profile": "<ul><li>Sens relationnel&nbsp;: le médecin coordonnateur est l’interlocuteur privilégié des résidents, de leur famille, du corps médical de l’institut mais aussi, des administrateurs et de la compagnie d’assurance maladie. C’est avant tout un communiquant qui doit faire preuve d’écoute, de diplomatie, de compréhension, d’adaptation selon les interlocuteurs, donc d’une grande habileté relationnelle.</li><li>Leadership&nbsp;: de par ses responsabilités, le médecin coordonnateur anime des équipes internes (<a href=\"https://www.objectif-emploi-orientation.fr/fiches-metiers/i-comme-infirmier/\">infirmiers</a>,<span>&nbsp;</span><a href=\"https://www.objectif-emploi-orientation.fr/fiches-metiers/a-comme-aide-soignant/\">aides-soignants</a>…) mais aussi des professionnels extérieurs (<a href=\"https://www.objectif-emploi-orientation.fr/fiches-metiers/k-comme-kinesitherapeute/\">kinésithérapeutes</a>,<span>&nbsp;</span><a href=\"https://www.objectif-emploi-orientation.fr/fiches-metiers/orthophoniste/\">orthophonistes</a>,<span>&nbsp;</span><a href=\"https://www.objectif-emploi-orientation.fr/fiches-metiers/p-comme-prodologue/\">podologues</a>, médecins spécialistes…). Piloter une équipe pluridisciplinaire nécessite de savoir motiver, résoudre les conflits, conjuguer les attentes et besoins de chacun… une main de fer dans un gant de velours&nbsp;!</li><li>Organisation et rigueur&nbsp;: polyvalent, il est à la fois, le conseiller technique du directeur, l’animateur des soignants et le prescripteur de prise en charge. Cette diversité de tâches implique un fort sens de l’organisation et beaucoup de discipline.</li><li>Force de proposition&nbsp;: bras droit du directeur de l’EHPAD, le médecin coordonnateur est sollicité pour faire évoluer et améliorer la prise en charge des résidents, les actions et les résultats de l’établissement. Sa créativité et son goût pour entreprendre des projets innovants sont donc appréciés<p><br></p><p><br></p><p>Pour exercer ce métier, il faut être titulaire du<span>&nbsp;</span>Diplôme d’État de Docteur en médecine<span>&nbsp;</span>puis compléter son cursus par<span>&nbsp;</span>une des formations suivantes<span>&nbsp;</span>&nbsp;:</p><ul><li>un DES (Diplôme d’études spécialisées) de gériatrie</li><li>une capacité de gérontologie</li><li>un DU de médecin coordonnateur en EHPAD</li><li>une attestation de formation délivrée par un organisme agréé</li></ul></li></ul>",
      "rome": "J1102",
      "salary": "A définir suivant profil",
      "title": "Médecin Coordonnateur - H/F",
      "url": "https://genesis.softy.pro/offre/16792?idt=105"
    },
    "-MHKm32oLCenIZy8AQYX": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-06-29 10:06:05",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Expérience exigée",
      "id": "16766_0",
      "location": "Bourgoin-Jallieu",
      "position": "<p>Nous recherchons pour notre client, entreprise indépendante spécialisées dans les Travaux Publics, un conducteur d'engins TP H/F.</p><p>Vos missions seront de réaliser des travaux de tranchées sur réseaux et travaux de terrassement sur pelle et mini pelle.</p><p>Poste avec possibilité d'évolution selon profil.<br></p>",
      "postcode": "38300",
      "profile": "<p>Autonome sur conduite de pelle et mini pelle.</p><p>Esprit d'équipe et Bon savoir être seront vos atouts majeurs!<br></p><p>Le permis C / CE&nbsp;est un plus.</p><p><br></p>",
      "rome": "F1302",
      "salary": "14 €/heure",
      "title": "CONDUCTEUR D'ENGINS TP - H/F",
      "url": "https://genesis.softy.pro/offre/16766?idt=105"
    },
    "-MHKm33UoNiKlOHshlDv": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-06-29 09:54:50",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Expérience exigée",
      "id": "16765_0",
      "location": "Bourgoin-Jallieu",
      "position": "<p>Nous recherchons pour notre client, entreprise spécialisée en soutènements et fondations auprès des professionnels et des particuliers sur un réseau national, un&nbsp;Centraliste H/F, qui derrière le foreur, prépare et alimente en béton à injecter ou à projeter.</p><p><br></p>",
      "postcode": "38300",
      "profile": "<p>Etre autonome sur l'utilisation de la centrale.</p><p>Etre mobile dans toute la France.</p><p>Avoir un réel esprit d'équipe.</p><p>Votre savoir-être sera votre 1er atout ! contactez-nous !</p>",
      "rome": "H2804",
      "salary": "14 €/heure",
      "title": "CENTRALISTE BETON - H/F",
      "url": "https://genesis.softy.pro/offre/16765?idt=105"
    },
    "-MHKm34Ex28oZK6J8jLd": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-06-29 09:44:47",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Expérience exigée",
      "id": "16758_0",
      "location": "Bourgoin-Jallieu",
      "position": "<p>Nous recherchons pour notre client, entreprise spécialisée en soutènements et fondations auprès des professionnels et des particuliers sur un réseau national, un Foreur Qualifié H/F.</p><p>Votre mission sera variée, vous pourrez en effet avoir l'opportunité de réaliser les travaux suivants :</p><p>- fondations par pieu (semi-jointifs, forés refoulés, forés tarière creuse, forés tubés) et par micropieux.</p><p>-&nbsp;renforcement de sols, inclusions rigides, tirants d’ancrages, reprise en sous-oeuvre, grillage de soutènement.</p><p>- paroi berlinoise (vibrofoncée, butonnée, tirantée, forée ou autostable), paroi clouée verticale ou inclinée et palplanches.</p><p><br></p><p><br></p>",
      "postcode": "38300",
      "profile": "<p>Etre autonome sur tout type de foreuse.</p><p>Etre mobile dans toute la France.</p><p>Avoir un réel esprit d'équipe.</p><p>Votre savoir-être sera votre 1er atout ! contactez-nous !</p>",
      "rome": "F1401",
      "salary": "14 €/heure",
      "title": "FOREUR - H/F",
      "url": "https://genesis.softy.pro/offre/16758?idt=105"
    },
    "-MHKm34u_WkYm3bdBorS": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-06-29 09:29:25",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Expérience exigée",
      "id": "16749_0",
      "location": "Nîmes",
      "position": "<p>Nous recherchons pour notre client, entreprise spécialisée en soutènements et fondations auprès des professionnels et des particuliers sur un réseau national, un Foreur Qualifié H/F.</p><p>Votre mission sera variée, vous pourrez en effet avoir l'opportunité de réaliser les travaux suivants :</p><p>- fondations par pieu (semi-jointifs, forés refoulés, forés tarière creuse, forés tubés) et par micropieux.</p><p>-&nbsp;renforcement de sols, inclusions rigides, tirants d’ancrages, reprise en sous-oeuvre, grillage de soutènement.</p><p>- paroi berlinoise (vibrofoncée, butonnée, tirantée, forée ou autostable), paroi clouée verticale ou inclinée et palplanches.</p><p><br></p><p><br></p>",
      "postcode": "",
      "profile": "<p>Etre autonome sur tout type de foreuse.</p><p>Etre mobile dans toute la France.</p><p>Avoir un réel esprit d'équipe.</p><p>Votre savoir-être sera votre 1er atout ! contactez-nous !</p>",
      "rome": "F1401",
      "salary": "14 €/heure",
      "title": "FOREUR - H/F",
      "url": "https://genesis.softy.pro/offre/16749?idt=105"
    },
    "-MHKm38IbMEfZUJccfmH": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-06-25 15:22:55",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Expérience exigée",
      "id": "16711_0",
      "location": "Mâcon",
      "position": "<p>Nous recherchons un conducteur d'engins type tombereau (CACES 8) pour un chantier à proximité de Mâcon pour une durée supérieure à 3 mois.</p><p>Vous travaillerez au sein d'une entreprise familiale spécialisée dans le&nbsp;terrassement.&nbsp;</p><p>Vos missions seront de :&nbsp;<span><span><br></span></span></p><p>  <p><span><span>¨<span>&nbsp; </span></span></span><span>Approvisionner ou vérifier l'approvisionnement du chantier en matériel et matériaux</span></p>  <p><span>¨<span>&nbsp; </span></span><span>Sécuriser le chantier et son environnement (signalisation, ...)</span></p>  <p><span><span>¨<span>&nbsp; </span></span></span><span>Mettre hors service une partie du réseau (eau, gaz, électricité) avant intervention</span></p>  <p><span><span>¨<span>&nbsp;&nbsp;</span></span></span></p><p><span>ieNous vous proposons un contrat de travail temporaire d'une durée de 3 mois&nbsp;avec 10% d'IFM et 10% d'ICP.</span></p><p><br></p>     </p>",
      "postcode": "71000",
      "profile": "<p>Nous recherchons une personne motivée et autonome afin de mener à bien les missions confiées. Nous recherchons une personne dynamique ayant envie de s'intégrer à l'équipe avec des réels qualités personnelles.</p><p>Si vous vous reconnaissez, envoyez-nous vos candidatures sans plus attendre</p><p>Au plaisir de travailler avec vous.<br></p>",
      "rome": "F1302",
      "salary": "14 €/heure",
      "title": "CONDUCTEUR D'ENGINS - H/F",
      "url": "https://genesis.softy.pro/offre/16711?idt=105"
    },
    "-MHKm38z5wiPTU2iw3dK": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-06-17 17:31:35",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Expérience exigée",
      "id": "16483_0",
      "location": "Thonon-les-Bains",
      "position": "<p>Mission pour chantier de forage à tirants. Conduite d'une&nbsp;foreuse hydraulique.</p><p>Chantier Grand Déplacement en montagne.</p>",
      "postcode": "74200",
      "profile": "<p>Maitrise du métier, de la technique par tirants et de la conduite d'une foreuse.</p><p>Mission de 2 mois à pourvoir dès le 22.06.2020.<br></p>",
      "rome": "F1401",
      "salary": "14 €/heure",
      "title": "FOREUR TIRANTS - H/F",
      "url": "https://genesis.softy.pro/offre/16483?idt=105"
    },
    "-MHKm39z-6DAzwXOTprp": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-06-16 14:57:02",
      "description": "<span>Genesis RH, est une agence d'emploi spécialisé dans l'expertise métier (intérim, CDD, CDI). Une équipe dynamique et à l'écoute pour vous accompagner dans votre recherche d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui partage vos valeurs et votre vision du monde professionnel.</span><br>",
      "experience": "Expérience souhaitée",
      "id": "16432_0",
      "location": "Charolles",
      "position": "<p>Nous recherchons pour notre client spécialisé dans le secteur des travaux publics, un Maçon VRD H/F.</p><p>Vous effectuez les travaux de maçonnerie VRD liés aux différents chantiers ainsi que la pose de réseaux d'assainissement. Vous devrez poser du béton désactivé et des tuyaux.</p><p>Vous accordez une importance particulière au respect des consignes de sécurité.</p>",
      "postcode": "71120",
      "profile": "<p>Vous justifiez d'une expérience en maçonnerie et travaux TP, VRD vous&nbsp;êtes autonome et aimez travailler en équipe, alors&nbsp;ce poste est fait pour vous!</p><p>Postulez dès à présent!</p>",
      "rome": "F1702",
      "salary": "12 €/heure",
      "title": "MACON VRD - H/F",
      "url": "https://genesis.softy.pro/offre/16432?idt=105"
    },
    "-MHKm3FppeCL1-lORioa": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-06-12 16:28:45",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Expérience exigée",
      "id": "16362_0",
      "location": "Lyon",
      "position": "<p>Nous recherchons pour notre client, un groupe d'envergure internationale, un chef de chantier TP Canalisation en contrat de travail temporaire d'une durée de 3 mois. Le chantier est à Lyon.</p><p><span>Vous aurez en charge :&nbsp;</span></p><ul><li><span>La supervision du chantier</span></li><li><span>Donner les consignes de travail&nbsp;</span></li><li><span>Lecture de plans et aide aux relevés topographiques</span></li><li><span>Implantation de réseaux sec et humides</span></li><li><span>L'application des consignes de sécurité</span></li><li><span>Le management de l'équipe&nbsp;</span></li><li><span>La gestion du personnel (planning et&nbsp; pointage)&nbsp;</span></li><li><span>Reporting au près du conducteur de travaux</span></li><li><span>La gestion de l’approvisionnement</span></li></ul>",
      "postcode": "",
      "profile": "<p>Nous recherchons un canalisateur expérimenté, vous êtes un expert dans votre domaine et avez déjà supervisé un chantier</p><p>Savoirs Faire recherchés</p><p>réseaux secs et humides</p><p>Techniques de Management et d'animation</p><p>respect des règles et des délais</p><p> Lecture de plan</p><p>Résolution de problème</p><p>Savoir être</p><p>Pragmatisme&nbsp;</p><p>Organisé</p><p>Bonne gestion du stress&nbsp;</p><p>Leadership</p><p><br></p><p>Si vous vous reconnaissez dans cette offre , postulez dès maintenant et intégrez l'agence Genesis RH de Mâcon.</p><p>Au plaisir de travailler en semble !<br></p>",
      "rome": "F1202",
      "salary": "De 2020 €/mois à 2670 €/mois",
      "title": "Chef de chantier TP Canalisation  - H/F",
      "url": "https://genesis.softy.pro/offre/16362?idt=105"
    },
    "-MHKm3GWWrLBEstX6kmv": {
      "contract_type": "CDD",
      "country": "France",
      "date": "2020-06-11 14:57:47",
      "description": "Genesis RH, ce n'est pas qu'une agence intérim. C'est avant tout une équipe dynamique et à l'écoute. Notre priorité : vous trouver au plus vite un emploi qui répondra à vos envies. Travail temporaire, CDD et CDI, nous vous trouvons dans les meilleurs délais une entreprise qui partage vos valeurs et votre vision du monde professionnel.",
      "experience": "Débutant accepté",
      "id": "16319_0",
      "location": "Paray-le-Monial",
      "position": "<span>Le préparateur en pharmacie est le seul autorisé à seconder le pharmacien. En pharmacie de ville, il accueille les patients et leur délivre les médicaments prescrits sur ordonnance. Il délivre aussi des produits qui sont en vente libre, comme en parapharmacie, et pour lesquels il apporte des conseils précieux. Dans une moindre mesure, le préparateur peut réaliser certaines préparations (médicaments, crèmes, pommades etc).</span><br><br><span>Au comptoir, sous le contrôle du pharmacien, le professionnel précise au patient les conditions dans lesquelles le traitement doit être suivi, il peut lui expliquer les modalités de son remboursement. Il est à même de vérifier que l'association de plusieurs médicaments n'est pas dangereuse, qu'il n'y a pas d'erreur de dosage ou qu'un traitement délivré à un jeune enfant correspond bien à son âge. Pour tout produit dangereux délivré, il enregistre le nom du médecin et celui du patient.</span><br><br><span>Une partie importante de son travail consiste à tenir les stocks à jour, activité essentielle pour la sécurité des patients. Concrètement, il élimine les produits périmés, vérifie les livraisons, range et classe avec précision tous les produits reçus. Lorsqu'un médicament n'est plus disponible, il appelle les fournisseurs afin de passer commande.</span><br>",
      "postcode": "71600",
      "profile": "<p><span>Un préparateur doit faire preuve d'une grande vigilance lorsqu'il prépare et délivre des médicaments, car une erreur peut avoir des conséquences graves pour le patient. Rigoureux et méthodique, il connaît parfaitement les médicaments et leur usage.</span><br><br><span>Le contact avec le public est très important en pharmacie de ville. Les clients attendent en effet un accueil de qualité, respectueux de la confidentialité, et souvent, des conseils pratiques sur leur traitement. Sans se substituer au médecin ou au pharmacien, le préparateur doit savoir répondre aux inquiétudes, expliquer et rassurer.&nbsp;</span></p><p><span></span>Brevet Professionnel de Préparateur en Pharmacie obligatoire. </p><p>Profil dynamique et motivé recherché.</p>",
      "rome": "J1307",
      "salary": "A définir suivant profil",
      "title": "PREPARATEUR EN PHARMACIE - H/F - H/F",
      "url": "https://genesis.softy.pro/offre/16319?idt=105"
    },
    "-MHKm3K1fhZHKvFmwg7R": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-06-11 14:37:58",
      "description": "<span>Genesis RH, est une&nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&nbsp;objectif est de vous trouver dans les meilleurs&nbsp;délais une entreprise qui&nbsp;partage vos valeurs et votre vision du monde professionnel</span>.&nbsp;<br>",
      "experience": "Expérience exigée",
      "id": "16316_0",
      "location": "Mâcon",
      "position": "<p><span>Le pharmacien hospitalier (H/F) fournit l'établissement de santé public en médicaments, dispositifs médicaux et fabrications. Il/elle doit tenir compte des obligations thérapeutiques et des contraintes budgétaires.</span></p><p><br></p><p><br></p><p>Missions :&nbsp;</p><ul><li><span>Gère les achats, l’approvisionnement, la détention et la gestion des produits de santé</span></li><li><span>Dispense ces produits de santé aux patients hospitalisés (analyse des prescriptions avec intervention pharmaceutique si besoin, préparation éventuelle des doses à administrer, délivrance, conseils de bon usage)</span></li><li><span>Réalise des préparations magistrales, hospitalières et officinales</span></li><li><span>Assure la traçabilité de certains médicaments et dispositifs médicaux implantables</span></li><li><span>Participe aux actions de pharmacovigilance, de matériovigilance et autres vigilances sanitaires</span></li><li><span>Assure la sécurisation du circuit du médicament à travers des actions qualité et sécurité des soins et gestion des risques</span></li><li><span>Contrôle les matières premières, les préparations, l'eau pour hémodialyse</span></li><li><span>Gère la stérilisation des dispositifs médicaux</span></li><li><span>Participe à la commission du médicament, aux recherches biomédicales, aux actions de formation et d'enseignements des personnels pharmaceutiques et autres paramédicaux et, selon les établissements, à l’éducation thérapeutique, à la pharmacocinétique, à l’hygiène.</span></li></ul><p><br></p><h2><br></h2>",
      "postcode": "71000",
      "profile": "<p>Vous êtes :</p><p><h2><span>Compétences et savoirs du pharmacien hospitalier</span></h2><p><br></p><ul><li><span>Assurance qualité</span></li><li><span>Biologie</span></li><li><span>Epidémiologie</span></li><li><span>Gestion</span></li><li><span>Informatique</span></li><li><span>Logistique</span></li><li><span>Management</span></li><li><span>Pharmacologie</span></li><li><span>Vigilance sanitaire</span><p><br></p><h2><span>Savoir-être du pharmacien hospitalier</span></h2><ul><li><span>Sens du relationnel</span></li><li><span>Sens du travail en équipe</span></li><li><span>Sens de l’écoute et de la décision,</span></li><li><span>Capacité de management de ressources et de projets</span></li><li><span>Organisation</span></li><li><span>Rigueur</span></li><li><span>Capacité à innover, à dégager des priorités</span></li></ul><h2><br></h2></li></ul><p><br></p><br></p>",
      "rome": "J1202",
      "salary": "A définir suivant profil",
      "title": "Pharmacien - H/F",
      "url": "https://genesis.softy.pro/offre/16316?idt=105"
    },
    "-MHKm3KtGTcgvpKAYALc": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-06-10 09:50:38",
      "description": "Genesis RH, ce n'est pas qu'une agence intérim. C'est avant tout une équipe dynamique et à l'écoute. Notre priorité : vous trouver au plus vite un emploi qui répondra à vos envies. Travail temporaire, CDD et CDI, nous vous trouvons dans les meilleurs délais une entreprise qui partage vos valeurs et votre vision du monde professionnel.",
      "experience": "Expérience souhaitée",
      "id": "16234_0",
      "location": "Lyon",
      "position": "L’aide-soignant participe au développement et à l’autonomie des patients. Il dispense les  soins liés à l’hygiène corporelle et au confort de la personne, il prépare le chariot pour la toilette, aide à la toilette (totale ou partielle).Il fait les changes, aide à l’habillage, prévient les risques d’escarres. Il participe à la gestion des stocks des produits (incontinence et autres), il assure les différents rangements.  Dispense des soins liés à l’alimentation, assure l’entretien de l’environnement immédiat de la personne et la réfection des lits, il participe à la distribution des repas, contrôle  la prise du repas, accompagne les patients aux toilettes pour rééducation urinaire. L’aide-soignant(e) aide l’infirmier à la réalisation de soins. Il respecte le secret professionnel, sa discrétion, efficacité doivent être irréprochables.",
      "postcode": "",
      "profile": "<p>Cette mission exige un savant mélange de savoir-faire médical et de compétences relationnelles&nbsp;:</p><p>- vous aimez le contact et la communication avec les patients et les familles</p><p>- vous recherchez un travail aussi enrichissant qu’exigeant. </p><p>Postulez, nous reviendrons vers vous très rapidement !&nbsp;</p>",
      "rome": "J1501",
      "salary": "13 €/heure",
      "title": "AIDE SOIGNANT - H/F",
      "url": "https://genesis.softy.pro/offre/16234?idt=105"
    },
    "-MHKm3LaV03Z8XSpAk93": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-06-10 09:45:55",
      "description": "Genesis RH, ce n'est pas qu'une agence intérim. C'est avant tout une équipe dynamique et à l'écoute. Notre priorité : vous trouver au plus vite un emploi qui répondra à vos envies. Travail temporaire, CDD et CDI, nous vous trouvons dans les meilleurs délais une entreprise qui partage vos valeurs et votre vision du monde professionnel.",
      "experience": "Débutant accepté",
      "id": "16233_0",
      "location": "Lyon",
      "position": "<p>Genesis RH recherche pour le compte de l'un de ses clients un/une infirmier/infimiere DE.&nbsp;</p><p><br></p><p>Vos principales missions seront :&nbsp;</p><p>- Réaliser des soins divers ( pansements, prélèvements...)&nbsp;</p><p>- Respect des prescriptions médicales</p><p>- Préparation et Distribution de médicaments</p><p>- Surveiller l'évolution des traitements et de leurs éventuels effets secondaires</p><p>- Veille au confort et au bien-être des patients</p><p>- Accompagnement des patients et de leurs proches</p><p>- Informer et sur les différents traitements en cours et participez à&nbsp;l'éducation en matière de santé&nbsp;</p><p>- Suivre et complétez&nbsp;les dossiers</p><p>- Gérez les stocks de médicaments et de matériels de soins&nbsp;</p><p>- Echange avec les autres soignants et/ou&nbsp;intervenants</p><p><br></p><p>Mission à pourvoir des maintenant.</p><p>Nuit et week-end en option&nbsp;</p><p>Avantage liés à&nbsp;l'interim : +10% d'IFM +10% d'ICP&nbsp;</p>",
      "postcode": "",
      "profile": "<p><span>Vous possédez un Diplôme d'Etat d'Infirmier, ou une expérience d'Infirmier en entreprise.</span></p><p><span>Vous avez des qualités relationnelles, d'écoute, de discernement et le sens de la confidentialité. Vous êtes organisé et faites preuve d'un bon niveau d'autonomie. Vous aimez travailler en équipe pluridisciplinaire, vous êtes sensibilisé à la prévention des risques professionnels. Vous maîtrisez les outils bureautiques, notamment le Pack Office.</span></p><p><br></p><p>n'hésitez pas à postuler des maintenant ou à passer en Agence (38 rue victor hugo - 71000 Macon)&nbsp;<br></p>",
      "rome": "J1502",
      "salary": "17 €/heure",
      "title": "INFIRMIER/E - H/F",
      "url": "https://genesis.softy.pro/offre/16233?idt=105"
    },
    "-MHKm3MPM-8Eox5HfPWg": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-05-28 11:11:47",
      "description": "Genesis RH, ce n'est pas qu'une agence intérim. C'est avant tout une équipe dynamique et à l'écoute. Notre priorité : vous trouver au plus vite un emploi qui répondra à vos envies. Travail temporaire, CDD et CDI, nous vous trouvons dans les meilleurs délais une entreprise qui partage vos valeurs et votre vision du monde professionnel.",
      "experience": "Expérience souhaitée",
      "id": "15928_0",
      "location": "Bourgoin-Jallieu",
      "position": "<p>Nous recherchons pour notre client, entreprise nationale de travaux routiers, un tireur de rateau H/F afin de réaliser les missions suivantes :</p><p>- Mettre en place les consignes de signalisation, de respect de l’environnement et assurer la sécurité du chantier</p><p><p><span>- Appliquer des enrobés et régler une plateforme manuellement</span></p><p>- Exécuter une implantation et effectuer des relevés</p><p>- Poser des bordures, des caniveaux, des pavés, du béton désactivé</p><p>- Conduire en sécurité un mini-engin de chantier (CACES 1 – R372m)</p><p><br></p></p><p><br></p>",
      "postcode": "38300",
      "profile": "<p>Vous possédez&nbsp;un bon contact humain et vous êtes capable de travailler en équipe. </p><p>Vous&nbsp;vous déplacerez au gré des chantiers et vous travaillerez dans un environnement et conditions climatiques parfois difficiles.</p><p>Si vous vous reconnaissez dans cette offre : postulez !<br></p>",
      "rome": "F1702",
      "salary": "12 €/heure",
      "title": "Tireur d'enrobé - H/F",
      "url": "https://genesis.softy.pro/offre/15928?idt=105"
    },
    "-MHKm3NC-CqrQEoylWRm": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-05-28 09:51:09",
      "description": "Genesis RH, c'est avant tout une équipe dynamique et à l'écoute. Notre priorité : vous trouver au plus vite un emploi qui répondra à vos envies. Travail temporaire, CDD et CDI, nous vous trouvons dans les meilleurs délais une entreprise qui partage vos valeurs et votre vision du monde professionnel.",
      "experience": "Expérience exigée",
      "id": "15921_0",
      "location": "Bourgoin-Jallieu",
      "position": "<p>Nous recherchons pour notre client spécialiste&nbsp;en grands travaux de fondations, un Foreur H/F dont les missions seront : </p><p>-&nbsp;<span>projeter le béton&nbsp;à travers une lance sous pression.</span></p><p><span>- ferraillage</span></p><p><span>- manutentions diverses</span></p><p><span>- apporte son aide au chef d'équipe</span></p><p><span>- nettoyage des outils et du chantier</span></p><p><span>- Chantier&nbsp;en haute montagne </span></p><p><span>- Grand déplacement&nbsp;</span></p>",
      "postcode": "38300",
      "profile": "<p>Vous justifiez&nbsp;d'une expérience significative dans ce domaine et vous aimez le travail d'équipe :</p><p>Postulez !</p><p>Nous reviendrons vers vous rapidement !</p>",
      "rome": "F1402",
      "salary": "14 €/heure",
      "title": "Foreur Béton Projeté - H/F",
      "url": "https://genesis.softy.pro/offre/15921?idt=105"
    },
    "-MHKm3NyRssgGL3JE0HL": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-05-27 16:17:00",
      "description": "Genesis RH, ce n'est pas qu'une agence intérim. C'est avant tout une équipe dynamique et à l'écoute. Notre priorité : vous trouver au plus vite un emploi qui répondra à vos envies. Travail temporaire, CDD et CDI, nous vous trouvons dans les meilleurs délais une entreprise qui partage vos valeurs et votre vision du monde professionnel.",
      "experience": "Expérience souhaitée",
      "id": "15903_0",
      "location": "Mâcon",
      "position": "<p>Nous recherchons pour un de nos clients spécialisés dans le bâtiment travaux publics un conducteur de pelle 5T.</p><p>Démarrage immédiat !!</p>",
      "postcode": "71000",
      "profile": "<p>Vous avez déjà une expérience en tant que pelleteur.</p><p>Vous avez vos CACES 1 et 2 à jour!</p><p><br></p><p>Vous êtes motivés et travaillez en autonomie , alors candidatez dès maintenant !!<br></p>",
      "rome": "F1302",
      "salary": "13 €/heure",
      "title": "Pelleteur - H/F",
      "url": "https://genesis.softy.pro/offre/15903?idt=105"
    },
    "-MHKm3S9Azrw_5AnVQKB": {
      "contract_type": "CDD",
      "country": "France",
      "date": "2020-05-22 11:15:42",
      "description": "Genesis RH, ce n'est pas qu'une agence intérim. C'est avant tout une équipe dynamique et à l'écoute. Notre priorité : vous trouver au plus vite un emploi qui répondra à vos envies. Travail temporaire, CDD et CDI, nous vous trouvons dans les meilleurs délais une entreprise qui partage vos valeurs et votre vision du monde professionnel.",
      "experience": "Débutant accepté",
      "id": "15799_0",
      "location": "Paray-le-Monial",
      "position": "<p>Réalise des préparations pharmaceutiques et délivre des produits (médicaments, dispositifs médicaux stériles, ...) selon la prescription médicale ou la demande individuelle. Peut conseiller et vendre des articles de parapharmacie.</p><br>",
      "postcode": "71600",
      "profile": "<p>Brevet Professionnel de Préparateur en Pharmacie obligatoire. </p><p>Profil dynamique et motivé recherché.</p>",
      "rome": "J1307",
      "salary": "A définir suivant profil",
      "title": "PREPARATEUR EN PHARMACIE - H/F - H/F",
      "url": "https://genesis.softy.pro/offre/15799?idt=105"
    },
    "-MHKm3SvbL3_R5wjGn_G": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-05-19 15:36:16",
      "description": "Genesis RH, ce n'est pas qu'une agence intérim. C'est avant tout une équipe dynamique et à l'écoute. Notre priorité : vous trouver au plus vite un emploi qui répondra à vos envies. Travail temporaire, CDD et CDI, nous vous trouvons dans les meilleurs délais une entreprise qui partage vos valeurs et votre vision du monde professionnel.",
      "experience": "Expérience exigée",
      "id": "15742_0",
      "location": "Bourgoin-Jallieu",
      "position": "<p>Nous recherchons pour notre client, spécialiste dans la construction de lignes aérienne électriques à très haute tension, des Monteurs HTB pour travaux sur la France entière.</p><p>Au sein d'équipes de 6 à 8 personnes vous intervenez sur toute la France sur les chantiers de lignes haute tension HTB.</p><p>Chantier de lignes neuves, renforcement de lignes existantes, vous travaillez en hauteur sur les lignes et pylônes du réseau électrique.</p><p>Vous réalisez les opérations de :</p><p>-Génie Civil, réalisation de fouilles pour les embases de pylônes,</p><p>-Assemblage et Levage des pylônes,</p><p>-Déroulage et réglage de câbles.</p><p></p>",
      "postcode": "38300",
      "profile": "<p>Aptitudes requises :</p><p>Travail en hauteur (40 à 100 m), Travail en équipe et en extérieur, Bonne aisance manuelle, Respect strict des règles de sécurité.</p><p>Vous êtes une personne rigoureuse et souhaitant travailler en Grands Déplacements. </p><p>Vous avez le goût pour les travaux extérieurs, l’esprit d’équipe et prêt à relever de nouveaux défis.</p><p>Expérience :</p><p>Vous avez déjà travaillé en hauteur dans le&nbsp;secteur&nbsp;du&nbsp;Bâtiment.</p><p>Les permis PL, caces nacelle ou manuscopique sont un plus.</p>",
      "rome": "F1605",
      "salary": "14 €/heure",
      "title": "Monteur Ligne Haute Tension - H/F",
      "url": "https://genesis.softy.pro/offre/15742?idt=105"
    },
    "-MHKm3TjwcDgbN6xJnw6": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-05-15 14:52:39",
      "description": "Genesis RH, ce n'est pas qu'une agence intérim. C'est avant tout une équipe dynamique et à l'écoute. Notre priorité : vous trouver au plus vite un emploi qui répondra à vos envies. Travail temporaire, CDD et CDI, nous vous trouvons dans les meilleurs délais une entreprise qui partage vos valeurs et votre vision du monde professionnel.",
      "experience": "Expérience souhaitée",
      "id": "15707_0",
      "location": "Heyrieux",
      "position": "<p><span><span>Nous recherchons pour notre client, entreprise du BTP, un Conducteur SPL H/F avec Grue Auxiliaire. LA mission sera de longue durée.</span></span></p><p><br></p><p><span><span>Vous&nbsp;</span>transportez, livrez et déchargez les produits&nbsp;<span>destinés aux clients professionnels comme particuliers.</span></span></p>  <p><span>Par votre fonction, vous&nbsp;contribuez de manière importante à la qualité du service client&nbsp;et à l’image de l’entreprise.</span></p>  <p><br></p><p><br></p>",
      "postcode": "38540",
      "profile": "<p><span>Vous êtes organisé(e), rigoureux et doté d'un bon relationnel client. </span></p>  <p><span>Autonome, polyvalent et investi, votre goût du service aux clients comme aux collaborateurs de l'équipe sera un atout pour réussir à ce poste.</span></p>  <p><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Sens du contact et de la relation commerciale</span></p>  <p><span>Vous engagez, par vos attitudes, l’image de l’entreprise. Vous devez donc faire preuve de professionnalisme, développer des qualités relationnelles et le sens de la relation commerciale : tenue soignée, ponctualité, politesse, écoute, contrôle de soi, recueil et transmission d’informations commerciales (vers les clients et vers le magasin)</span></p>  <p><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Sens de l’organisation, logique</span></p>  <p><span>Vous agissez selon le planning établit par votre responsable mais devez néanmoins savoir faire preuve d’un réel sens de l’organisation pour gérer votre tournée et réagir aux éventuels aléas. Ce sens de l’organisation vous permet de gérer de manière optimale votre temps et vos trajets.</span></p>  <p><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Esprit d’équipe et d’entreprise</span></p>  <p><span>Vous faites preuve de disponibilité et de respect envers vos collègues.</span></p><p><br></p><br>",
      "rome": "N1104",
      "salary": "A définir suivant profil",
      "title": "Conducteur PL Grue Auxiliaire - H/F",
      "url": "https://genesis.softy.pro/offre/15707?idt=105"
    },
    "-MHKm3U_-CJwlR9zr_J0": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-05-13 10:12:32",
      "description": "Genesis RH, ce n'est pas qu'une agence intérim. C'est avant tout une équipe dynamique et à l'écoute. Notre priorité : vous trouver au plus vite un emploi qui répondra à vos envies. Travail temporaire, CDD et CDI, nous vous trouvons dans les meilleurs délais une entreprise qui partage vos valeurs et votre vision du monde professionnel.",
      "experience": "Expérience souhaitée",
      "id": "15636_0",
      "location": "Charolles",
      "position": "<p>Nous recherchons pour l'un de nos clients situé à Charolles, et pour effectuer des chantiers aux alentours, un menuisier ! H/F</p><p>Vos missions seront les suivantes:</p><p>- Tracer les plans du projet commandé par le client ou utiliser des plans préexistants ;</p><p>- Usiner différentes pièces en atelier à l'aide d'un outillage spécifique </p><p>- Préparer les vitrages à mettre en place sur l'ouvrage à réaliser </p><p>- Assurer la pose de l'ouvrage chez le client</p><p>- Assurer la maintenance de l'ouvrage</p><p>- Veiller au respect des normes en vigueur dans son secteur professionnel.</p><p><br></p><p>Base hebdomadaire de 35h semaine</p><p>10% ICP +10% IFM<br></p>",
      "postcode": "71120",
      "profile": "<p>Nous recherchons une personne motivée, rigoureuse et qui a déjà travaillé en menuiserie, notamment en pose.</p><p>Si vous pensez correspondre à cette annonce, postulez dès maintenant !</p><p>Au plaisir de travailler avec vous !</p>",
      "rome": "F1607",
      "salary": "12 €/heure",
      "title": "MENUISIER POSEUR - H/F",
      "url": "https://genesis.softy.pro/offre/15636?idt=105"
    },
    "-MHKm3bWYRevgd9oVIZi": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-05-05 17:40:00",
      "description": "Genesis RH, ce n'est pas qu'une agence intérim. C'est avant tout une équipe dynamique et à l'écoute. Notre priorité : vous trouver au plus vite un emploi qui répondra à vos envies. Travail temporaire, CDD et CDI, nous vous trouvons dans les meilleurs délais une entreprise qui partage vos valeurs et votre vision du monde professionnel.",
      "experience": "Expérience exigée",
      "id": "15548_0",
      "location": "Mâcon",
      "position": "<p>Nous recherchons pour un de nos clients, entreprise basée sur Mâcon, spécialisée dans la chaudronnerie et tuyauterie en Inox, un tuyauteur pour un démarrage immédiat.</p><p>Vous serez en charge de la conception de cuve de stockage, de cuve mélange, fondoir, fermenteur ou cuves pharmaceutiques alimentaires.</p><p>Vous effectuerez&nbsp;les missions suivantes: </p><p>Lecture de plan, préparation des&nbsp;zones d'assemblage,préfabrication&nbsp;de&nbsp;portions de tuyauterie, découpe des tuyaux, décapage, cintrage.</p><p><br></p><br>",
      "postcode": "71000",
      "profile": "<p>Nous recherchons une personne confirmée avec une expérience d'au moins 2 ans en tant que tuyauteur.</p><p>Vous êtes dynamique, consciencieux, et souhaitez vous donner toute les chances pour évoluer dans une entreprise à taille humaine.</p><p>Alors postulez dès à présent !<br></p><p><br></p>",
      "rome": "H2902",
      "salary": "15 €/heure",
      "title": "TUYAUTEUR - H/F",
      "url": "https://genesis.softy.pro/offre/15548?idt=105"
    },
    "-MHKm3cQgaWxBEp3kzqx": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-03-12 16:26:28",
      "description": "Genesis RH, ce n'est pas qu'une agence intérim. C'est avant tout une équipe dynamique et à l'écoute. Notre priorité : vous trouver au plus vite un emploi qui répondra à vos envies. Travail temporaire, CDD et CDI, nous vous trouvons dans les meilleurs délais une entreprise qui partage vos valeurs et votre vision du monde professionnel.",
      "experience": "Expérience exigée",
      "id": "14791_0",
      "location": "Saint-Rémy",
      "position": "<p>Nous recherchons pour notre client spécialiste de la rénovation un plaquiste.</p><p>Vous serez en charge de : </p><p>- Réaliser et fixer des huisseries, encadrements et montants en fonction de réservations ou des ouvertures </p><p>- Fixer l'ossature et poser des sols et des plafonds</p><p>- Monter des cloisons et des doublages en panneaux </p><p>- Effectuer les joints et renforcer la structure des panneaux</p><p>Tout en respectant les consignes de sécurité</p>",
      "postcode": "71100",
      "profile": "<p>Vous êtes expérimenté et autonome sur le plaquage et ferraillage&nbsp;alors ce poste est fait pour vous!</p><p>Postulez dès maintenant!</p><p><br></p>",
      "rome": "F1604",
      "salary": "A définir suivant profil",
      "title": "Plaquiste - H/F",
      "url": "https://genesis.softy.pro/offre/14791?idt=105"
    },
    "-MHKm3dIIzn-OnHrJ1_r": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-03-12 09:41:56",
      "description": "Genesis RH, ce n'est pas qu'une agence intérim. C'est avant tout une équipe dynamique et à l'écoute. Notre priorité : vous trouver au plus vite un emploi qui répondra à vos envies. Travail temporaire, CDD et CDI, nous vous trouvons dans les meilleurs délais une entreprise qui partage vos valeurs et votre vision du monde professionnel.",
      "experience": "Expérience souhaitée",
      "id": "14762_0",
      "location": "Mâcon",
      "position": "<p>Nous recherchons pour l'un de nos clients, un chauffeur PL déménageur.&nbsp;</p><p>Vous travaillerez dans une entreprise familiale&nbsp;qui a fêté son cinquantenaire en 2013.</p><p>Basé historiquement au centre-ville de Mâcon,&nbsp;la société de déménagement a également un bureau à Lyon 6ème&nbsp;et leurs bâtiments de stockage se trouvent à Bourg-en-Bresse&nbsp;et Replonges, en Zone d’Activité Mâcon Est.&nbsp;&nbsp;</p><p><br></p><p>Vos missions au sein de l'entreprise seront :</p><p>- Conduire le camion PL de l'entrepôt au lieu de déménagement</p><p>- Participer pleinement au déménagement</p><p>- Respecter les consignes et le code de la route</p><p>- Port de charges lourde</p><p>Vous resterez dans la région et rentrerez chaque soir.</p><p>Avantage agence d'interim :10% d'IFM et 10% d'ICP.</p>",
      "postcode": "71000",
      "profile": "<p>Vous êtes motivé, dynamique et avait le gout du travail manuel et d'équipe.</p><p>Alors postulez dès à présent ou rendez-vous en agence!</p>",
      "rome": "N4101",
      "salary": "A définir suivant profil",
      "title": "CHAUFFEUR PL DEMENAGEUR - H/F",
      "url": "https://genesis.softy.pro/offre/14762?idt=105"
    },
    "-MHKm3e8-JcU__mobEas": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-03-10 10:17:48",
      "description": "Genesis RH, ce n'est pas qu'une agence intérim. C'est avant tout une équipe dynamique et à l'écoute. Notre priorité : vous trouver au plus vite un emploi qui répondra à vos envies. Travail temporaire, CDD et CDI, nous vous trouvons dans les meilleurs délais une entreprise qui partage vos valeurs et votre vision du monde professionnel.",
      "experience": "Débutant accepté",
      "id": "14693_0",
      "location": "Ouroux-sur-Saône",
      "position": "<p>Nous recherchons pour notre client spécialisé dans la construction de pièces métalliques un Monteur / chaudronnier.&nbsp;</p><p><br></p><p>Vos missions :&nbsp;</p><p>Lecture de plan,&nbsp;</p><p>Assemblage,</p><p>Pointage,</p><p>Montage.</p>",
      "postcode": "71370",
      "profile": "<p>Vous avez l'esprit d'équipe et d'initiative, </p><p>êtes autonome, </p><p>avez l'envie constante d'apprendre.</p><p><br></p><p>Ce poste est fait pour vous.&nbsp;</p><p><br></p><p><br></p>",
      "rome": "H2902",
      "salary": "A définir suivant profil",
      "title": "MONTEUR / CHAUDRONNIER - H/F",
      "url": "https://genesis.softy.pro/offre/14693?idt=105"
    },
    "-MHKm3f-3fqcYCTS-ORu": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-03-10 09:26:29",
      "description": "Genesis RH, ce n'est pas qu'une agence intérim. C'est avant tout une équipe dynamique et à l'écoute. Notre priorité : vous trouver au plus vite un emploi qui répondra à vos envies. Travail temporaire, CDD et CDI, nous vous trouvons dans les meilleurs délais une entreprise qui partage vos valeurs et votre vision du monde professionnel.",
      "experience": "Débutant accepté",
      "id": "14684_0",
      "location": "Mâcon",
      "position": "<p>GenesisRH recherche pour l'un de ses clients un/une aide-soignante.&nbsp;</p><p><br></p><p>Sous l'autorité du ou de la chef de service et de l'infirmier/e :&nbsp;</p><p>- vous accompagnerez les patients qui ne peuvent s'assumer.</p><p>- vous réaliserez certains soins.</p><p>- vous veillerez à&nbsp;l'hygiène du service ( en collaboration avec les agents de service hospitalier )&nbsp;</p><p><br></p>",
      "postcode": "71000",
      "profile": "<p>Vous disposez d'un diplôme d'état d'aide-soignant ou vous avez une bonne expérience du métier?&nbsp;</p><p>Vous avez des&nbsp;qualités d'écoute et de communication?</p><p>Vous êtes autonome, vous faites preuve de discrétion, de rigueur, et avez l'esprit d'équipe?</p><p><br></p><p>N'hésitez plus et postulez dés maintenant!!&nbsp;</p><p><br></p><p><br></p>",
      "rome": "J1501",
      "salary": "13 €/heure",
      "title": "Aide Soignant(e)  H/F  - H/F",
      "url": "https://genesis.softy.pro/offre/14684?idt=105"
    },
    "-MHKm3jxDWCH798wVxoH": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-03-06 16:43:25",
      "description": "Genesis RH, ce n'est pas qu'une agence intérim. C'est avant tout une équipe dynamique et à l'écoute. Notre priorité : vous trouver au plus vite un emploi qui répondra à vos envies. Travail temporaire, CDD et CDI, nous vous trouvons dans les meilleurs délais une entreprise qui partage vos valeurs et votre vision du monde professionnel.",
      "experience": "Expérience souhaitée",
      "id": "14647_0",
      "location": "La Côte-Saint-André",
      "position": "<p>Notre client, entreprise familiale du BTP, recherche un conducteur d'engins TP polyvalent :</p><p>- pelles à chenilles et et pelles à pneus</p><p>- petite et grande capacité</p><p>- chantiers locaux / PAS DE GRAND DEPLACEMENT<br></p>",
      "postcode": "38260",
      "profile": "<p>Nous recherchons pour ce poste :</p><p>- une personne connaissant bien le secteur géographique</p><p>- capable de conduire sur pelle à chenilles et à pneus (Mecalac)</p><p>- sur chantier comme en carrière<br></p>",
      "rome": "F1302",
      "salary": "14 €/heure",
      "title": "CONDUCTEUR D'ENGINS TP - H/F",
      "url": "https://genesis.softy.pro/offre/14647?idt=105"
    },
    "-MHKm3kqfFrcewE063ND": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-03-04 08:46:05",
      "description": "Genesis RH, ce n'est pas qu'une agence intérim. C'est avant tout une équipe dynamique et à l'écoute. Notre priorité : vous trouver au plus vite un emploi qui répondra à vos envies. Travail temporaire, CDD et CDI, nous vous trouvons dans les meilleurs délais une entreprise qui partage vos valeurs et votre vision du monde professionnel.",
      "experience": "Expérience souhaitée",
      "id": "14571_0",
      "location": "Mâcon",
      "position": "<p>Nous recherchons pour un de nos client&nbsp;spécialisé&nbsp;dans le domaine des travaux publics, un poseur canalisateur pour le réseaux sec. ( Canalisation pour la fibre optique )</p><p>Il effectuera des travaux :</p><p>- de terrassement, </p><p>- tranchées, </p><p>- pose de canalisations, </p><p>- branchements, </p><p>- raccords...</p><p><br></p><p>Base hebdomadaire de 35h.</p><p>10% d'IFM</p><p>10% d'ICP</p>",
      "postcode": "71000",
      "profile": "<p><span>Vous appréciez&nbsp;le travail manuel, vous avez déjà une première expérience dans les travaux publics.</span></p><p><span>Vous aimez travailler en extérieur et en équipe.</span></p><p><span>Vous êtes dynamique, entreprenant, alors cette mission est pour vous!</span></p><p><br></p><p>Candidatez dès à présent sur notre site!</p>",
      "rome": "F1705",
      "salary": "12 €/heure",
      "title": "Poseur canalisateur H/F - H/F",
      "url": "https://genesis.softy.pro/offre/14571?idt=105"
    },
    "-MHKm3ls8OkCb5x-n605": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-03-04 08:43:42",
      "description": "Genesis RH, ce n'est pas qu'une agence intérim. C'est avant tout une équipe dynamique et à l'écoute. Notre priorité : vous trouver au plus vite un emploi qui répondra à vos envies. Travail temporaire, CDD et CDI, nous vous trouvons dans les meilleurs délais une entreprise qui partage vos valeurs et votre vision du monde professionnel.",
      "experience": "Expérience souhaitée",
      "id": "14570_0",
      "location": "Mâcon",
      "position": "<p>Vous travaillez au sein d'une entreprise familiale, vos différentes missions sont :&nbsp;</p><p><br></p><p>- Implanter et sécuriser le chantier&nbsp;</p><p>- Lever et installer des éléments de structure bois</p><p>- Fixer des structures porteuses</p><p>- Repérer les particularités du montage de la toiture d'origine</p><p>- Déposer tout ou partie de la toiture</p><p>- Déterminer l'emplacement des supports et les poser</p><p>- Découper et poser les tuiles, ardoises, tôles, ...</p><p>- Façonner et poser les gouttières, les chéneaux&nbsp;et tuyaux de descente</p><p>- Poser les fermetures menuisées en toiture et réaliser les raccordements d'étanchéité</p><p><br></p><p>Base hebdomadaire de 35h heures supplémentaires au delà&nbsp;rémunérées à 25%.</p><p>Diverses indemnités liées à l'agence d'interim : 10% d'IFM et 10% d'ICP.</p>",
      "postcode": "71000",
      "profile": "<p>Vous êtes une personne autonome, rigoureuse et vous avez l'esprit d'équipe.</p><p>Vous êtes en capacité d'effectuer des calcul de métré, de portée, de résistance aux efforts et charges.</p><p>Vous connaissez les différentes caractéristiques des bois et dérivés du bois.</p><p>Alors cette mission est pour vous!! N'hésitez plus à candidater directement sur notre site ou à vous rendre dans notre agence.</p>",
      "rome": "F1501",
      "salary": "13 €/heure",
      "title": "Charpentier - H/F - H/F",
      "url": "https://genesis.softy.pro/offre/14570?idt=105"
    },
    "-MHKm3mkao6qfmQA-OZw": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-03-04 08:41:12",
      "description": "Genesis RH, ce n'est pas qu'une agence intérim. C'est avant tout une équipe dynamique et à l'écoute. Notre priorité : vous trouver au plus vite un emploi qui répondra à vos envies. Travail temporaire, CDD et CDI, nous vous trouvons dans les meilleurs délais une entreprise qui partage vos valeurs et votre vision du monde professionnel.",
      "experience": "Débutant accepté",
      "id": "14568_0",
      "location": "Mâcon",
      "position": "<p>Nous recherchons pour l'un de nos clients dont les chantiers se situent à Mâcon et alentours, un COUVREUR H/F qualifié !</p><p>Vos missions seront de :</p><p>- recouvrir les toits de tuiles, d’ardoises, de zinc... </p><p>- assurer l’étanchéité et l’évacuation des eaux de pluie, du faîtage à la ligne d’égout jusqu’au réseau collectif d’évacuation des eaux pluviales&nbsp;</p><p>- intervenir&nbsp;après la pose de la charpente pour un bâtiment neuf, ou à l’occasion d’une réparation sur les toitures des maisons individuelles comme des immeubles collectifs</p><p>- poser l’isolation thermique sous le toit </p><p><br></p><p>Base hebdomadaire 35h. + heures supplémentaires à 25%</p><p>Indemnités diverses liées à l'agence d'interim : +10% IFM + 10% ICP<br></p><p><br></p>",
      "postcode": "71000",
      "profile": "<p>Vous avez la capacité de&nbsp;travailler en hauteur, vous êtes une personne motivée, rigoureuse et polyvalente.</p><p>Alors n'hésitez plus et candidatez dès maintenant ou rendez-vous directement en agence!</p><p>Au plaisir de travailler avec vous !</p>",
      "rome": "F1610",
      "salary": "13 €/heure",
      "title": "COUVREUR - H/F",
      "url": "https://genesis.softy.pro/offre/14568?idt=105"
    },
    "-MHKm3nfAFK9pBmQXeSA": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-03-04 08:39:26",
      "description": "Genesis RH, ce n'est pas qu'une agence intérim. C'est avant tout une équipe dynamique et à l'écoute. Notre priorité : vous trouver au plus vite un emploi qui répondra à vos envies. Travail temporaire, CDD et CDI, nous vous trouvons dans les meilleurs délais une entreprise qui partage vos valeurs et votre vision du monde professionnel.",
      "experience": "Expérience souhaitée",
      "id": "14567_0",
      "location": "Mâcon",
      "position": "<p>Nous recherchons pour une entreprise Mâconnaise de gros oeuvre spécialisée dans la construction et rénovation, un maçon finisseur à St GERMAIN DU PLAIN:</p><p>Nous pouvons vous organiser un point de ramasse à Mâcon ou Tournus.</p><p>Vos missions seront les suivantes&nbsp;=</p><p>&nbsp; &nbsp; &nbsp; - Tout travaux de finissions &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </p><p>&nbsp; &nbsp; &nbsp; -&nbsp; Finition de prémurs</p><p>&nbsp; &nbsp; &nbsp; - Joint&nbsp;de prémurs&nbsp; &nbsp; &nbsp; &nbsp;</p><p>&nbsp; &nbsp; &nbsp; - Ratissage au mortier&nbsp; &nbsp; &nbsp; &nbsp;</p><p>&nbsp; &nbsp; &nbsp; -Utilisation d’enduits spécifiques</p><p><br></p><p>Indemnités diverses : +10% d'IF + 10% d'ICP</p>",
      "postcode": "71000",
      "profile": "<p>Vous avez le sens du travail en équipe et individuel. Vous avez la capacité de vous&nbsp;adapter à divers environnement de travail (temps, lieu du chantier, équipe…). </p><p>Vous êtes soigneux et rigoureux dans votre travail.</p><p>Vous&nbsp;appliquez&nbsp;les consignes de sécurité.</p><p>Vous avez déjà une expérience dans le domaine alors n'hésitez plus et postulez à cette offre ou rendez vous dans notre agence!</p>",
      "rome": "F1703",
      "salary": "13 €/heure",
      "title": "MACON FINISSEUR - H/F",
      "url": "https://genesis.softy.pro/offre/14567?idt=105"
    },
    "-MHKm3tNtE41Iv3nIqvr": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-03-04 08:34:36",
      "description": "Genesis RH, ce n'est pas qu'une agence intérim. C'est avant tout une équipe dynamique et à l'écoute. Notre priorité : vous trouver au plus vite un emploi qui répondra à vos envies. Travail temporaire, CDD et CDI, nous vous trouvons dans les meilleurs délais une entreprise qui partage vos valeurs et votre vision du monde professionnel.",
      "experience": "Expérience souhaitée",
      "id": "14566_0",
      "location": "Mâcon",
      "position": "<p><span>Nous recherchons pour notre client dans le bâtiment et travaux de gros oeuvre, un Maçon Coffreur H/F.</span></p><p><span>Vos missions seront les suivantes :</span></p><p><span>- Placer les échafaudages et les dispositifs de sécurité. </span></p><p><span>- Prévoir&nbsp;la quantité de béton, bois, fers d’armature et les autres matériaux nécessaires. </span></p><p><span>- Réceptionner et stocker les matériaux. </span></p><p><span>- Assembler les boisages pour en faire des moules : les coffrages étanches qui vont contenir le béton. </span></p><p><span>- Réserver les emplacements nécessaires à l’installation des canalisations. </span></p><p><span>- Placer les barres d’étais qui maintiennent le serrage du coffrage. </span></p><p><span>- Insérer l’armature de fer à l’intérieur du coffrage si le béton doit être armé. </span></p><p><span>- S’assurer du calage de l’ouvrage et de son étanchéité.</span></p><p><span>- Superviser l’opération nécessitant une grue pour le positionnement du coffrage. </span></p><p><span>- Décoffrer l’ensemble quand le béton est sec.&nbsp;</span></p><p><span><br></span></p><p><span>Base Hebdomadaire 35h.</span></p><p><span>Diverses indemnités liés à l'agence d'intérim&nbsp;: +10% IFM , + 10% ICP</span></p>",
      "postcode": "71000",
      "profile": "<p><span>Vous êtes autonome, soigné et rigoureux.</span></p>  <p><span>Vous avez le sens de l’initiative et du travail en équipe.</span></p>  <p><span>&nbsp;</span></p>  <p><span>Vous maîtrisez les différentes techniques de ferraillage, de coulage du béton, de butonnage. Vous savez lire des plans et des schémas, vous maîtrisez l’équerrage et vous savez monter les banches.</span></p>  <p><span>&nbsp;</span></p>  <p><span>Alors cette mission est pour vous&nbsp;! N’hésitez pas à postuler à cette annonce ou à nous contacter au 03 85 20 30 00</span></p><br>",
      "rome": "F1703",
      "salary": "13 €/heure",
      "title": "MACON COFFREUR - H/F",
      "url": "https://genesis.softy.pro/offre/14566?idt=105"
    },
    "-MHKm41n_KO_pk6EwdZd": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-03-04 08:32:49",
      "description": "Genesis RH, ce n'est pas qu'une agence intérim. C'est avant tout une équipe dynamique et à l'écoute. Notre priorité : vous trouver au plus vite un emploi qui répondra à vos envies. Travail temporaire, CDD et CDI, nous vous trouvons dans les meilleurs délais une entreprise qui partage vos valeurs et votre vision du monde professionnel.",
      "experience": "Débutant accepté",
      "id": "14565_0",
      "location": "Mâcon",
      "position": "<p>Nous recherchons pour un de nos clients spécialisé dans la charpente métallique un bardeur ou aide bardeur. Cette entreprise est située à Mâcon, c'est une entreprise familiale ayant des besoins pour renforcer son équipe.&nbsp;</p><p>Voici les missions :</p><p>- Baliser et sécuriser la zone de chantier et ses abords (filets, barrières, rubans fluorescents, ...) </p><p>- Décharger et répartir les matériaux sur les zones de stockage ou de montage </p><p>- Assembler au sol et monter les éléments de structures métalliques (tribunes, chapiteaux, scènes, ...) </p><p>- Lever, installer et fixer les éléments de structures métalliques entre eux (poteaux, sablières, arbalétriers, chevêtres, ...) ou sur un support (gousset, ...) </p><p>- Démonter une structure métallique existante </p><p>- Réaliser l'isolation et l'étanchéité de la toiture, terrasse</p><p><br></p><p>Base hebdomadaire de 35h, heures supplémentaires rémunérées à 25%</p><p>Avantages liées à l'agence d'interim : +10% d'IFM, +10% ICP</p>",
      "postcode": "71000",
      "profile": "<p>        Vous êtes rigoureux , aimez&nbsp;le travail manuel et apte&nbsp;à travailler en hauteur.</p><p>Vous êtes autonome et motivé d'acquérir une expérience dans le bâtiment ou de confirmer cette dernière.</p><p>Alors n'hésitez plus et candidater dès à présent sur notre site! Nous vous attendons également en agence!</p>",
      "rome": "F1502",
      "salary": "12 €/heure",
      "title": "BARDEUR - H/F",
      "url": "https://genesis.softy.pro/offre/14565?idt=105"
    },
    "-MHKm42guWO25qTxSOUK": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-03-04 08:26:58",
      "description": "Genesis RH, ce n'est pas qu'une agence intérim. C'est avant tout une équipe dynamique et à l'écoute. Notre priorité : vous trouver au plus vite un emploi qui répondra à vos envies. Travail temporaire, CDD et CDI, nous vous trouvons dans les meilleurs délais une entreprise qui partage vos valeurs et votre vision du monde professionnel.",
      "experience": "Expérience souhaitée",
      "id": "14562_0",
      "location": "Mâcon",
      "position": "<p>Nous recherchons pour une de nos entreprises familiales située&nbsp;à Mâcon et spécialisée dans la maçonnerie traditionnelle, un/une Maçon.</p><p>Vos missions seront les suivantes :&nbsp;</p><p>-&nbsp;Monter les structures porteuses (échafaudage, étaiement, plate-forme, ...) </p><p>- Terrasser et niveler la fondation </p><p>- Monter les murs par maçonnage d'éléments portés (briques,)</p><p>- Préparer et appliquer les mortiers, enduits, ... </p><p>- Assembler et positionner les éléments d'armature d'un béton </p><p><br></p><p>Base hebdomadaire de 35h, heures supplémentaires 25%</p><p>Indemnités diverses : +10% IFM + 10% ICP</p>",
      "postcode": "71000",
      "profile": "<p>Vous êtes rigoureux, polyvalent et aimez le travail d'équipe.&nbsp; &nbsp;</p><p>Vous maîtrisez les différentes techniques de maçonnerie, d'application d'enduits ou de ferraillage.</p><p>Alors n'hésitez plus et postulez dès à présent sur notre site ou rendez-vous en agence.</p><p><br></p><p>Au plaisir de travailler prochainement avec vous!</p>",
      "rome": "F1703",
      "salary": "13 €/heure",
      "title": "MACON TRADITIONNEL - H/F",
      "url": "https://genesis.softy.pro/offre/14562?idt=105"
    },
    "-MHKm43hswqqYbJnTvy5": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-02-26 14:46:50",
      "description": "Genesis RH, ce n'est pas qu'une agence intérim. C'est avant tout une équipe dynamique et à l'écoute. Notre priorité : vous trouver au plus vite un emploi qui répondra à vos envies. Travail temporaire, CDD et CDI, nous vous trouvons dans les meilleurs délais une entreprise qui partage vos valeurs et votre vision du monde professionnel.",
      "experience": "Expérience souhaitée",
      "id": "14392_0",
      "location": "Mâcon",
      "position": "<p>Vous êtes soudeur TIG et vous souhaitez travailler dans une structure de qualité ? Ce poste est pour vous !</p><p>Nous recherchons pour une mission interim de longue durée un soudeur TIG sur la région mâconnaise.</p><p>Vos missions seront de :</p><ul><li>Préparation du poste de travail (EPI, rangement, nettoyage)</li><li>Soudage des pièces selon les procédés MIG ou TIG</li><li>Contrôle de la qualité de soudure</li><li>Tri et rangement des pièces sur palette par commande et/ou par<span>&nbsp;client</span></li></ul><p>Contrat avec de nombreux avantages :</p><p>- +10% d'IFM<br>- +10% d'ICP<br>- avantages de la société utilisatrice<br>- taux horaire intéressant&nbsp;</p>",
      "postcode": "71000",
      "profile": "<p>Nous recherchons une personne avec un réel savoir être pour faciliter au mieux l'intégration au sein de l'entreprise</p><p>SAVOIR ETRE :</p><p>- impliqué<br>- travailleur<br>- autonome<br>- bon relationnel</p><p>Si vous correspondez au profil attendu, n'hésitez pas à postuler à cette annonce</p><p>Au plaisir de travailler avec vous</p>",
      "rome": "H2913",
      "salary": "14 €/heure",
      "title": "SOUDEUR TIG  - H/F",
      "url": "https://genesis.softy.pro/offre/14392?idt=105"
    },
    "-MHKm44f7rY2dR02kMRC": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-02-24 17:52:13",
      "description": "Genesis RH, ce n'est pas qu'une agence intérim. C'est avant tout une équipe dynamique et à l'écoute. Notre priorité : vous trouver au plus vite un emploi qui répondra à vos envies. Travail temporaire, CDD et CDI, nous vous trouvons dans les meilleurs délais une entreprise qui partage vos valeurs et votre vision du monde professionnel.",
      "experience": "Débutant accepté",
      "id": "14328_0",
      "location": "Mâcon",
      "position": "<p>Genesis RH recherche pour le compte de l'un de ses clients un/une infirmier/infimiere DE.&nbsp;</p><p><br></p><p>Vos principales missions seront :&nbsp;</p><p>- Réaliser des soins divers ( pansements, prélèvements...)&nbsp;</p><p>- Respect des prescriptions médicales</p><p>- Préparation et Distribution de médicaments</p><p>- Surveiller l'évolution des traitements et de leurs éventuels effets secondaires</p><p>- Veille au confort et au bien-être des patients</p><p>- Accompagnement des patients et de leurs proches</p><p>- Informer et sur les différents traitements en cours et participez à&nbsp;l'éducation en matière de santé&nbsp;</p><p>- Suivre et complétez&nbsp;les dossiers</p><p>- Gérez les stocks de médicaments et de matériels de soins&nbsp;</p><p>- Echange avec les autres soignants et/ou&nbsp;intervenants</p><p><br></p><p>Mission à pourvoir des maintenant.</p><p>Nuit et week-end en option&nbsp;</p><p>Avantage liés à&nbsp;l'interim : +10% d'IFM +10% d'ICP&nbsp;</p>",
      "postcode": "71000",
      "profile": "<p><span>Vous possédez un Diplôme d'Etat d'Infirmier, ou une expérience d'Infirmier en entreprise.</span></p><p><span>Vous avez des qualités relationnelles, d'écoute, de discernement et le sens de la confidentialité. Vous êtes organisé et faites preuve d'un bon niveau d'autonomie. Vous aimez travailler en équipe pluridisciplinaire, vous êtes sensibilisé à la prévention des risques professionnels. Vous maîtrisez les outils bureautiques, notamment le Pack Office.</span></p><p><br></p><p>n'hésitez pas à postuler des maintenant ou à passer en Agence (38 rue victor hugo - 71000 Macon)&nbsp;<br></p>",
      "rome": "J1502",
      "salary": "18 €/heure",
      "title": "INFIRMIER/E - H/F",
      "url": "https://genesis.softy.pro/offre/14328?idt=105"
    },
    "-MHKm4AYGIcaTUisJXtN": {
      "contract_type": "CDI",
      "country": "France",
      "date": "2020-02-06 11:10:27",
      "description": "Genesis RH, ce n'est pas qu'une agence intérim. C'est avant tout une équipe dynamique et à l'écoute. Notre priorité : vous trouver au plus vite un emploi qui répondra à vos envies. Travail temporaire, CDD et CDI, nous vous trouvons dans les meilleurs délais une entreprise qui partage vos valeurs et votre vision du monde professionnel.",
      "experience": "Expérience exigée",
      "id": "13718_0",
      "location": "Montceau-les-Mines",
      "position": "<p>Vous êtes ouvrier paysagiste et vous êtes disponible ?</p><p>Nous recherchons un ouvrier paysagiste&nbsp;pour travailler dans une entreprise familiale et dynamique en plein développement. Vous travaillerez sur plusieurs chantiers dans le 71 entre Montceau Les Mines et Mâcon.</p><p>Vous serez autonome sur vos chantiers et aurez en charge la bonne réalisation de ceux ci.</p><p>Vos missions :</p><p>- entretien<br>- pavage<br>- terrassement<br>- nivellement<br>- montage de murs en pierre et agglo<br>- création d'ouvrage de maçonnerie<br>- pose de clôtures&nbsp;</p><p>Le poste proposé est à pourvoir en CDI et donnera droit à de nombreux avantages</p>",
      "postcode": "71300",
      "profile": "<p>Nous recherchons impérativement une personne autonome, impliquée et investie. Vous devrez être totalement autonome dans vos missions.</p><p>Nous recherchons en priorité une personne avec les caces 1 à 9 + permis PL mais nous restons ouverts à toutes les candidatures.</p><p>Si vous êtes expérimenté, compétent, autonome, vous nous intéressez !</p><p>Au plaisir de travailler avec vous</p>",
      "rome": "A1203",
      "salary": "A définir suivant profil",
      "title": "PAYSAGISTE - H/F",
      "url": "https://genesis.softy.pro/offre/13718?idt=105"
    },
    "-MHKm4BU8TXaHYB1Wq5a": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2020-01-31 17:43:56",
      "description": "Genesis RH, ce n'est pas qu'une agence intérim. C'est avant tout une équipe dynamique et à l'écoute. Notre priorité : vous trouver au plus vite un emploi qui répondra à vos envies. Travail temporaire, CDD et CDI, nous vous trouvons dans les meilleurs délais une entreprise qui partage vos valeurs et votre vision du monde professionnel.",
      "experience": "Débutant accepté",
      "id": "13562_0",
      "location": "Bourgoin-Jallieu",
      "position": "<p>Nous recherchons un infirmier de bloc opératoire H/F afin de venir renforcer les équipes de notre client, établissement de soins chirurgicaux. Les missions seront les suivantes :</p><p>- Intervention avant, pendant et après une opération</p><p>- Préparation&nbsp;du matériel</p><p>- Assistance du patient</p><p>- Assistance du chirurgien pendant l’intervention</p><p>- Présence en salle de réveil</p>",
      "postcode": "38300",
      "profile": "<p>Vous êtes diplômée d’État formée dans un IFSI (institut de formation en soins infirmiers),</p><p>Envoyez-nous votre candidature !<br></p>",
      "rome": "J1504",
      "salary": "De 2050 €/mois à 2800 €/mois",
      "title": "INFIRMIER DE BLOC OPERATOIRE - H/F",
      "url": "https://genesis.softy.pro/offre/13562?idt=105"
    },
    "-MHKm4CV22s1yEmaUHZ4": {
      "contract_type": "CDD",
      "country": "France",
      "date": "2020-01-31 17:13:43",
      "description": "Genesis RH, ce n'est pas qu'une agence intérim. C'est avant tout une équipe dynamique et à l'écoute. Notre priorité : vous trouver au plus vite un emploi qui répondra à vos envies. Travail temporaire, CDD et CDI, nous vous trouvons dans les meilleurs délais une entreprise qui partage vos valeurs et votre vision du monde professionnel.",
      "experience": "Débutant accepté",
      "id": "13561_0",
      "location": "Paray-le-Monial",
      "position": "<p>Vos principales missions :</p><p>_Accueil et prise en charge du patient dans sa globalité</p><p>_Mise en place du patient conformément aux exigences de la technique utilisées, en tenant compte de son état clinique</p><p>_Pose d'une voie veineuse éventuelle</p><p>_Préparation de matériel de ponction, d'injection, d'exploration et de matériel médicochirurgicale</p><p>_Préparation et administration orale, rectale, ou injection intraveineuse des substances nécessaires à l'obtention d'une image</p><p>_Réglage, déclenchement, maintenance et correction des pannes des appareils</p><p>_Participation à la surveillance clinique du patient au cours des investigations.</p><p>_Recueil de l'image et traitement de celle-ci</p><p>_Participation à l'application des règles de d'hygiène et de radioprotection tant en ce qui concerne le patient que son environnement mais aussi du travailleur lui-même.</p><p>&nbsp;_Cotation des examens réalisés et traçabilité de la dose</p><p>_Aide à l'exécution par le médecin des actes d'échographie</p><p>_Organisation de la programmation journalière des examens<br></p>",
      "postcode": "71600",
      "profile": "<p>Connaissances requises :</p><p>_Anatomie : Connaissances approfondies nécessaires</p><p>_Clinique : Le technicien en Radiologie conventionnelle doit posséder les éléments de clinique lui permettant une mise en oeuvre adéquate des appareillages du service, pour fournir ainsi à l'unité demandeuse, au médecin responsable du site, des images répondant aux exigences de qualité du service.</p><p>Il doit être en mesure de pratiquer des ponctions veineuses, de préparer le matériel nécessaire à toutes les investigations réalisées dans le service, dans le respect des protocoles existants.</p><p>_Technologique : Utilisation de l'informatique,faculté d'adaptation à différents types d'appareillages radiologiques, traitement et développement de l'image.</p><p>_Techniques radiologiques : </p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Pratique du positionnement en Radiologie</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Adaptation de ses connaissances et de son savoir être dans des situations particulières complexes</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Pratique du choix des paramètres&nbsp;</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Archivage<br></p>",
      "rome": "J1102",
      "salary": "A définir suivant profil",
      "title": "MANIPULATEUR RADIOLOGIE - H/F",
      "url": "https://genesis.softy.pro/offre/13561?idt=105"
    },
    "-MHKm4DZQTul5BxZsEkx": {
      "contract_type": "CDI",
      "country": "France",
      "date": "2020-01-16 10:13:43",
      "description": "Genesis RH, ce n'est pas qu'une agence intérim. C'est avant tout une équipe dynamique et à l'écoute. Notre priorité : vous trouver au plus vite un emploi qui répondra à vos envies. Travail temporaire, CDD et CDI, nous vous trouvons dans les meilleurs délais une entreprise qui partage vos valeurs et votre vision du monde professionnel.",
      "experience": "Expérience souhaitée",
      "id": "12974_0",
      "location": "Voiron",
      "position": "<p>Vous êtes conducteur de travaux spécialisé dans les travaux publics et le terrassement ?</p><p>Nous recherchons un conducteur de travaux TP pour travailler au sein d'une entreprise française de TP qui oeuvre dans le secteur des carrières.</p><p>Nous vous proposons un poste en CDI pour un démarrage rapidement. Vous aurez :</p><p>- un 13ème mois<br>- un véhicule de fonction<br>- des primes d'activité<br>- des varaibles&nbsp;</p><p>Vos missions seront de :</p><p>- gestion commerciale des fournisseurs et des clients<br>- établir les dévis avec les clients<br>- développement commercial&nbsp;<br>- gestion du planning<br>- gestion des RH&nbsp;<br>- mise de place des chantiers<br>- suivi des chantiers<br>- management des équipes et des chefs de chantier<br>- suivi des budgets&nbsp;<br>- contrôle des coûts<br>- respect des règles de sécurité&nbsp;</p>",
      "postcode": "38500",
      "profile": "<p>Nous recherchons une personne avec de l'expérience et disposant d'un réel savoir être afin de faciliter au mieux l'intégration. Si vous êtes travailleur, autonome, impliqué, investi et force de proposition ce poste est fait pour vous !</p><p>N'hésitez pas à postuler !</p><p>Au plaisir de travailler avec vous&nbsp;<br></p>",
      "rome": "F1201",
      "salary": "De 2500 €/mois à 3000 €/mois",
      "title": "CONDUCTEUR DE TRAVAUX TP - H/F",
      "url": "https://genesis.softy.pro/offre/12974?idt=105"
    },
    "-MHKm4EYVfFtYdPgDvm6": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2019-12-11 16:35:41",
      "description": "Genesis RH, ce n'est pas qu'une agence intérim. C'est avant tout une équipe dynamique et à l'écoute. Notre priorité : vous trouver au plus vite un emploi qui répondra à vos envies. Travail temporaire, CDD et CDI, nous vous trouvons dans les meilleurs délais une entreprise qui partage vos valeurs et votre vision du monde professionnel.",
      "experience": "Expérience souhaitée",
      "id": "12081_0",
      "location": "Tournus",
      "position": "<p>Nous recherchons pour un de nos clients un technicien de maintenance chaudière gaz et fioul.</p><p>Vos missions seront les suivantes :</p><p>- Réaliser&nbsp;les interventions de maintenance, d’entretien et de dépannage des installations de type chaudière à gaz, fioul,</p><p>- Rechercher et anticiper les dysfonctionnements,</p><p>- Diagnostiquer les pannes et réaliser le dépannage en autonomie,</p><p>- Rendre&nbsp;compte de l’intervention et renseigner les bons d’intervention,</p><p>- Rédiger éventuellement quelques devis,</p><p>- Intervenir en respectant les règles de sécurité et de qualité.</p><p><br></p><p>Base hebdo de 39h.<br></p>",
      "postcode": "71700",
      "profile": "<p>Nous recherchons des personnes ayant idéalement&nbsp;une première expérience dans le domaine. Nous souhaitons des profils technicien de maintenance car notre client ne fait pas d'installation.&nbsp;</p><p>Vous êtes motivés, assidu et autonome, alors postulez sans plus attendre.<br></p>",
      "rome": "I1308",
      "salary": "A définir suivant profil",
      "title": "CHAUFFAGISTE  - H/F",
      "url": "https://genesis.softy.pro/offre/12081?idt=105"
    },
    "-MHKm4Pv7jotHzilgv1c": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2019-11-13 19:29:20",
      "description": "Genesis RH, ce n'est pas qu'une agence intérim. C'est avant tout une équipe dynamique et à l'écoute. Notre priorité : vous trouver au plus vite un emploi qui répondra à vos envies. Travail temporaire, CDD et CDI, nous vous trouvons dans les meilleurs délais une entreprise qui partage vos valeurs et votre vision du monde professionnel.",
      "experience": "Débutant accepté",
      "id": "11092_0",
      "location": "Beaune",
      "position": "<p>Nous recherchons pour notre client un conducteur de ligne en extrusion plastique&nbsp;</p><p>&nbsp;Vos missions :&nbsp;</p><p>- Respect des consignes de sécurité,&nbsp; </p><p>- Préparer&nbsp;la machine, </p><p>- Régler&nbsp;et alimenter&nbsp;la machine d'extrusion, </p><p>- Vider les bacs,&nbsp; </p><p>- Contrôler la qualité de la production, </p><p>- Entretien de la machine et de la zone de travail.</p><p><br></p><p>Poste en 5/8.</p>",
      "postcode": "21200",
      "profile": "<p>Nous recherchons un profil technicien ayant idéalement&nbsp; le CACES 3.</p><p><br></p><p>Vous serez&nbsp;formé et accompagné, tout au long votre intégration.&nbsp;<br></p>",
      "rome": "H3202",
      "salary": "A définir suivant profil",
      "title": "Conducteur de ligne Extrusion H/F - H/F",
      "url": "https://genesis.softy.pro/offre/11092?idt=105"
    },
    "-MHKm4QvXw2Es9HygesP": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2019-11-04 17:07:02",
      "description": "Genesis RH, ce n'est pas qu'une agence intérim.  C'est avant tout une équipe dynamique et à l'écoute. Notre priorité : vous trouver au plus vite un emploi qui répondra à vos envies.  Travail temporaire, CDD et CDI, nous vous trouvons dans les meilleurs délais une entreprise qui partage vos valeurs et votre vision du monde professionnel.",
      "experience": "Débutant accepté",
      "id": "10846_0",
      "location": "Annecy",
      "position": "<p>Vous travaillez au sein d'une équipe dynamique.&nbsp;</p><p>Vous réalisez l'entretien courant des véhicules :</p><p>- Vidanges,&nbsp;</p><p>- Freins,&nbsp;</p><p>- Pneus,&nbsp;</p><p>- Embrayages,&nbsp;</p><p>- Echappements...<br></p><p><br></p>",
      "postcode": "74000",
      "profile": "<p>Nous recherchons pour notre client spécialiste de l'entretien automobile, un profil&nbsp;</p><p>Dynamique,&nbsp;</p><p>Autonome,&nbsp;</p><p>Ayant l'esprit d'équipe,&nbsp;</p><p>Polyvalent.&nbsp;<br></p>",
      "rome": "I1604",
      "salary": "A définir suivant profil",
      "title": "MECANICIEN - H/F",
      "url": "https://genesis.softy.pro/offre/10846?idt=105"
    },
    "-MHKm4S1mPS1kPRRdiC1": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2019-10-18 16:54:29",
      "description": "Genesis RH, ce n'est pas qu'une agence intérim. C'est avant tout une équipe dynamique et à l'écoute. Notre priorité : vous trouver au plus vite un emploi qui répondra à vos envies. Travail temporaire, CDD et CDI, nous vous trouvons dans les meilleurs délais une entreprise qui partage vos valeurs et votre vision du monde professionnel.",
      "experience": "Expérience souhaitée",
      "id": "10310_0",
      "location": "Bourgoin-Jallieu",
      "position": "<p>Spécialistes des travaux acrobatiques&nbsp;et de&nbsp;génie civil&nbsp;notre client recrute pour plusieurs missions de&nbsp;:</p><p>- Travaux&nbsp;en hauteur sur cordes</p><p>- Réparation, nettoyage,&nbsp;réaménagement,</p><p>- Chantiers pour particuliers, professionnels,&nbsp;collectivités dans les régions Bourgogne-Franche-Comté, Provence-Alpes-Côte d’Azur – Lorraine, Rhône-Alpes et Champagne-Ardenne.</p>",
      "postcode": "38300",
      "profile": "<p>Vous êtes certifié(e) cordiste (H/F) et vous avez déjà approché les métiers des Travaux Publics et/ou Fondations spéciales,</p><p>Postulez ! Nous reviendrons vers vous rapidement !</p><p>agence.bourgoin@genesisrh.fr<br></p>",
      "rome": "I1501",
      "salary": "A définir suivant profil",
      "title": "CORDISTE - H/F",
      "url": "https://genesis.softy.pro/offre/10310?idt=105"
    },
    "-MHKm4T7uZe6Gd-3maq7": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2019-10-09 17:57:09",
      "description": "Genesis RH, ce n'est pas qu'une agence intérim. C'est avant tout une équipe dynamique et à l'écoute. Notre priorité : vous trouver au plus vite un emploi qui répondra à vos envies. Travail temporaire, CDD et CDI, nous vous trouvons dans les meilleurs délais une entreprise qui partage vos valeurs et votre vision du monde professionnel.",
      "experience": "Expérience exigée",
      "id": "10010_0",
      "location": "Mâcon",
      "position": "<p>Dans le cadre de plusieurs missions en GRAND DEPLACEMENT, notre client, basé à Mâcon nord, recherche un CONDUCTEUR DE CHARGEUR sur pneus H/F au plus vite.</p><p>Vos missions principales seront de :</p><p>- Préparer l'engin chargeur</p><p>- Intervenir sur les carrières pour du déblaiement des amas de terre ou de pierres à l’aide du chargeur</p><p>- Travailler selon les règles et consignes de sécurité</p><p>Le Caces 4, engin de chantier est&nbsp;OBLIGATOIRE&nbsp;dans le cadre de cette mission.</p>",
      "postcode": "71000",
      "profile": "<p>Nous recherchons une personne souhaitant travailler en grand déplacement, motivée, investie et surtout rigoureuse.</p><p>Une première expérience est exigée pour ce poste.</p><p>Si vous pensez correspondre à cet emploi, postulez dès à présent !</p><p>agence.macon@genesisrh.fr ou 03.85.20.30.00</p><p>Au plaisir de travailler avec vous !</p>",
      "rome": "F1302",
      "salary": "A définir suivant profil",
      "title": "CONDUCTEUR DE CHARGEUR - H/F",
      "url": "https://genesis.softy.pro/offre/10010?idt=105"
    },
    "-MHKm4UGg4jzfKKtbElY": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2019-10-09 17:57:09",
      "description": "Genesis RH, ce n'est pas qu'une agence intérim. C'est avant tout une équipe dynamique et à l'écoute. Notre priorité : vous trouver au plus vite un emploi qui répondra à vos envies. Travail temporaire, CDD et CDI, nous vous trouvons dans les meilleurs délais une entreprise qui partage vos valeurs et votre vision du monde professionnel.",
      "experience": "Expérience exigée",
      "id": "10010_1",
      "location": "Bourg-en-Bresse",
      "position": "<p>Dans le cadre de plusieurs missions en GRAND DEPLACEMENT, notre client, basé à Mâcon nord, recherche un CONDUCTEUR DE CHARGEUR sur pneus H/F au plus vite.</p><p>Vos missions principales seront de :</p><p>- Préparer l'engin chargeur</p><p>- Intervenir sur les carrières pour du déblaiement des amas de terre ou de pierres à l’aide du chargeur</p><p>- Travailler selon les règles et consignes de sécurité</p><p>Le Caces 4, engin de chantier est&nbsp;OBLIGATOIRE&nbsp;dans le cadre de cette mission.</p>",
      "postcode": "01000",
      "profile": "<p>Nous recherchons une personne souhaitant travailler en grand déplacement, motivée, investie et surtout rigoureuse.</p><p>Une première expérience est exigée pour ce poste.</p><p>Si vous pensez correspondre à cet emploi, postulez dès à présent !</p><p>agence.macon@genesisrh.fr ou 03.85.20.30.00</p><p>Au plaisir de travailler avec vous !</p>",
      "rome": "F1302",
      "salary": "A définir suivant profil",
      "title": "CONDUCTEUR DE CHARGEUR - H/F",
      "url": "https://genesis.softy.pro/offre/10010?idt=105"
    },
    "-MHKm4VHKIVzt7Ru_M7N": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2019-10-09 17:57:09",
      "description": "Genesis RH, ce n'est pas qu'une agence intérim. C'est avant tout une équipe dynamique et à l'écoute. Notre priorité : vous trouver au plus vite un emploi qui répondra à vos envies. Travail temporaire, CDD et CDI, nous vous trouvons dans les meilleurs délais une entreprise qui partage vos valeurs et votre vision du monde professionnel.",
      "experience": "Expérience exigée",
      "id": "10010_2",
      "location": "Tournus",
      "position": "<p>Dans le cadre de plusieurs missions en GRAND DEPLACEMENT, notre client, basé à Mâcon nord, recherche un CONDUCTEUR DE CHARGEUR sur pneus H/F au plus vite.</p><p>Vos missions principales seront de :</p><p>- Préparer l'engin chargeur</p><p>- Intervenir sur les carrières pour du déblaiement des amas de terre ou de pierres à l’aide du chargeur</p><p>- Travailler selon les règles et consignes de sécurité</p><p>Le Caces 4, engin de chantier est&nbsp;OBLIGATOIRE&nbsp;dans le cadre de cette mission.</p>",
      "postcode": "71700",
      "profile": "<p>Nous recherchons une personne souhaitant travailler en grand déplacement, motivée, investie et surtout rigoureuse.</p><p>Une première expérience est exigée pour ce poste.</p><p>Si vous pensez correspondre à cet emploi, postulez dès à présent !</p><p>agence.macon@genesisrh.fr ou 03.85.20.30.00</p><p>Au plaisir de travailler avec vous !</p>",
      "rome": "F1302",
      "salary": "A définir suivant profil",
      "title": "CONDUCTEUR DE CHARGEUR - H/F",
      "url": "https://genesis.softy.pro/offre/10010?idt=105"
    },
    "-MHKm4bO0rtvgmNBZpnF": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2019-09-04 17:02:54",
      "description": "Genesis RH, ce n'est pas qu'une agence intérim. C'est avant tout une équipe dynamique et à l'écoute. Notre priorité : vous trouver au plus vite un emploi qui répondra à vos envies. Travail temporaire, CDD et CDI, nous vous trouvons dans les meilleurs délais une entreprise qui partage vos valeurs et votre vision du monde professionnel.",
      "experience": "Débutant accepté",
      "id": "8904_0",
      "location": "Chalon-sur-Saône",
      "position": "<p>Nous recherchons pour l'un de nos clients spécialisé&nbsp;dans le secteur d'activité de la construction de réseaux électriques et de télécommunications</p><p>- Un CHAUFFEUR SPL&nbsp;H/F :</p><p>- Conduite de camion SPL en départ à la semaine ou quinzaine&nbsp;</p><p>- Approvisionnements de matériels sur le chantier</p><p><br></p><p>Nous recherchons un profil avec dans l'idéal le CACES grue.</p><p><br></p><p>Si vous ne bénéficiez pas du CACES, nous financerons la formation.&nbsp;</p><p><br></p><p> </p><p><br></p>",
      "postcode": "71100",
      "profile": "<p>Nous recherchons avant tout un savoir être. </p><p>Vous faites preuve d'un excellent relationnel et vous êtes capable de vivre en communauté avec vos collègues.&nbsp;</p><p>Vous êtes titulaire des permis B / C / EC + carte conducteur et carte qualification conducteur.</p>",
      "rome": "N4101",
      "salary": "A définir suivant profil",
      "title": "Conducteur SPL - H/F",
      "url": "https://genesis.softy.pro/offre/8904?idt=105"
    },
    "-MHKm4cQrqIzEhCxvYo_": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2019-07-30 09:26:27",
      "description": "Genesis RH, ce n'est pas qu'une agence intérim. C'est avant tout une équipe dynamique et à l'écoute. Notre priorité : vous trouver au plus vite un emploi qui répondra à vos envies. Travail temporaire, CDD et CDI, nous vous trouvons dans les meilleurs délais une entreprise qui partage vos valeurs et votre vision du monde professionnel.",
      "experience": "Expérience exigée",
      "id": "8207_0",
      "location": "Bourgoin-Jallieu",
      "position": "<p>Nous recherchons pour notre client, entreprise de gros oeuvre, un coffreur-bancheur H/F, pour la construction d'un logement collectif de standing.</p><p><br></p>",
      "postcode": "38300",
      "profile": "<p>Vous avez une expérience significative dans le gros oeuvre,</p><p>Vous maitrisez les techniques de coffrage et de banchage,</p><p>Vous savez travailler en toute autonomie une fois les directives données,</p><p><span>Nous sommes toujours intéressés de connaître les talents des personnes qui partagent nos valeurs et nous lirons avec attention les CV et informations que vous nous communiquerez.</span></p>",
      "rome": "F1701",
      "salary": "14 €/heure",
      "title": "MACON - H/F",
      "url": "https://genesis.softy.pro/offre/8207?idt=105"
    },
    "-MHKm4dWvPnPTEtIiHy-": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2019-07-30 08:35:21",
      "description": "Genesis RH, ce n'est pas qu'une agence intérim. C'est avant tout une équipe dynamique et à l'écoute. Notre priorité : vous trouver au plus vite un emploi qui répondra à vos envies. Travail temporaire, CDD et CDI, nous vous trouvons dans les meilleurs délais une entreprise qui partage vos valeurs et votre vision du monde professionnel.",
      "experience": "Expérience souhaitée",
      "id": "8204_0",
      "location": "Moirans",
      "position": "<p>Nous recherchons un conducteur d'engins de chantier&nbsp;H/F pour notre client&nbsp;entreprise qui travaille&nbsp;sur le territoire national sur grands chantiers TP&nbsp;et carrières.</p><p>Détails de la mission&nbsp;:</p><p>-&nbsp;conduite d’engins CACES 2 et 4 : pelle à chenilles et pelle à pneus et chargeur</p><p> - maintenance engins TP de 1er niveau</p><p> - Déplacement sur la France entière</p>",
      "postcode": "38430",
      "profile": "<p>Vous justifiez d'une expérience significative dans les travaux publics,</p><p>Vous avez des connaissances en&nbsp;maintenance de premier niveau&nbsp;: changement de filtres, roulement et méca...</p><p>Contactez-nous ! Nous reviendrons vers vous très rapidement.</p>",
      "rome": "F1302",
      "salary": "12 €/heure",
      "title": "CONDUCTEUR D'ENGINS TP - H/F",
      "url": "https://genesis.softy.pro/offre/8204?idt=105"
    },
    "-MHKm4qeF-BSNirlDy5x": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2019-02-22 10:00:04",
      "description": "<p>&lt;span&gt;Genesis RH, est une&amp;nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&amp;nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&amp;nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&amp;nbsp;objectif est de vous trouver dans les meilleurs&amp;nbsp;délais une entreprise qui&amp;nbsp;partage vos valeurs et votre vision du monde professionnel&lt;/span&gt;.&amp;nbsp;&lt;br&gt;</p>",
      "experience": "Débutant accepté",
      "id": "5232_0",
      "location": "Chalon-sur-Saône",
      "position": "<p>Vous êtes infirmier(e) et diplomé(e) d'Etat ?\n\nDans ce cas, nous vous proposons des missions avec prises de postes dans le 71, sur la région chalonnaise et du Creusot.\n\nNous cherchons plusieurs infirmiers diplômés d'Etat pour travailler en milieux hospitaliers et/ou dans des centres de soins.\n\nVos missions seront de :\n\n•\tPlanifier le plan de soins infirmiers selon les besoins des patients et préparer le chariot de soins ou la trousse médicale\n•\tEffectuer les soins infirmiers, communiquer avec le patient (ressenti, douleur, ...) et actualiser le dossier de soins infirmiers (incidents, modifications d'état clinique, ...)\n•\tSurveiller l'état clinique du patient (constantes, fonctions d'élimination, comportement, ...) et informer l'équipe soignante/médicale sur l'évolution de l'état clinique\n•\tEffectuer ou contrôler la réalisation des soins d'hygiène, de confort et apporter une aide au patient (lever, marche, soins post opératoires...)\n•\tRéaliser le suivi technico-administratif des dossiers (entrées/sorties/transferts des patients, archivage ...) et renseigner sur la prise en charge médicale</p>",
      "postcode": "71100",
      "profile": "<p>Si vous êtes diplômés d'Etat, vous nous intéressez !\n\nNous cherchons avant tout des profils disposant d'un vrai savoir être, que vous soyez débutant ou non.\n\nSAVOIR ETRE :\n\n- ponctuel\n- sens de l'écoute\n- assidu</p>",
      "rome": "J1502",
      "salary": "17 €/heure",
      "title": "INFIRMIER - H/F",
      "url": "https://genesis.softy.pro/offre/5232?idt=105"
    },
    "-MHKm4rh0w3NVWEbVHhy": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2019-02-22 10:00:04",
      "description": "<p>&lt;span&gt;Genesis RH, est une&amp;nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&amp;nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&amp;nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&amp;nbsp;objectif est de vous trouver dans les meilleurs&amp;nbsp;délais une entreprise qui&amp;nbsp;partage vos valeurs et votre vision du monde professionnel&lt;/span&gt;.&amp;nbsp;&lt;br&gt;</p>",
      "experience": "Débutant accepté",
      "id": "5232_1",
      "location": "Le Creusot",
      "position": "<p>Vous êtes infirmier(e) et diplomé(e) d'Etat ?\n\nDans ce cas, nous vous proposons des missions avec prises de postes dans le 71, sur la région chalonnaise et du Creusot.\n\nNous cherchons plusieurs infirmiers diplômés d'Etat pour travailler en milieux hospitaliers et/ou dans des centres de soins.\n\nVos missions seront de :\n\n•\tPlanifier le plan de soins infirmiers selon les besoins des patients et préparer le chariot de soins ou la trousse médicale\n•\tEffectuer les soins infirmiers, communiquer avec le patient (ressenti, douleur, ...) et actualiser le dossier de soins infirmiers (incidents, modifications d'état clinique, ...)\n•\tSurveiller l'état clinique du patient (constantes, fonctions d'élimination, comportement, ...) et informer l'équipe soignante/médicale sur l'évolution de l'état clinique\n•\tEffectuer ou contrôler la réalisation des soins d'hygiène, de confort et apporter une aide au patient (lever, marche, soins post opératoires...)\n•\tRéaliser le suivi technico-administratif des dossiers (entrées/sorties/transferts des patients, archivage ...) et renseigner sur la prise en charge médicale</p>",
      "postcode": "71200",
      "profile": "<p>Si vous êtes diplômés d'Etat, vous nous intéressez !\n\nNous cherchons avant tout des profils disposant d'un vrai savoir être, que vous soyez débutant ou non.\n\nSAVOIR ETRE :\n\n- ponctuel\n- sens de l'écoute\n- assidu</p>",
      "rome": "J1502",
      "salary": "17 €/heure",
      "title": "INFIRMIER - H/F",
      "url": "https://genesis.softy.pro/offre/5232?idt=105"
    },
    "-MHKm4sswHXh_cqYuP5n": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2019-02-22 09:18:55",
      "description": "<p>&lt;span&gt;Genesis RH, est une&amp;nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&amp;nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&amp;nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&amp;nbsp;objectif est de vous trouver dans les meilleurs&amp;nbsp;délais une entreprise qui&amp;nbsp;partage vos valeurs et votre vision du monde professionnel&lt;/span&gt;.&amp;nbsp;&lt;br&gt;</p>",
      "experience": "Débutant accepté",
      "id": "5230_0",
      "location": "Chalon-sur-Saône",
      "position": "<p>Vous avez déjà travaillé en tant qu'aide soignant(e) et vous étes mobile entre Chalon sur Saône et Le Creusot ?\n\nNous vous proposons des missions de courtes et longues durées en fonction de vos disponibilités dans le 71.\n\nNous recherchons des profils mobiles, volontaires et impliqués.\n\nVos missions : \n\n- aide à la toilette des patients\n- apporter les repas tout en respectant les différents régimes alimentaires\n- surveiller l'état physique et mental des patients pour anticiper d'eventuelles interventions\n- nettoyer les locaux du personnel et les chambres des patients</p>",
      "postcode": "71100",
      "profile": "<p>Nous cherchons des personnes motivées et mobiles.\n\nNous préparons les plannings en avance en fonction de vos disponiblités et de vos envies. Possibilité de travailler de week-end et de soir. Mais c'est vous qui décidez !\n\nPour ce métier de proximité et de service, vous devez justifiez d'un vrai savoir être \n\nSAVOIR ETRE : \n\n- serviable\n- sens de l'écoute\n- ponctuel\n\nVotre rémunération est comprise entre 13euros et 16euros de l'heure.\n\nVoiture nécessaire pour se rendre disponible sur différents postes de travail.\n\nSi ce poste vous intéresse, envoyez-nous votre candidature à l'adresse suivante : gestion.medical@genesisrh.fr</p>",
      "rome": "J1501",
      "salary": "15 €/heure",
      "title": "AIDE SOIGNANT - H/F",
      "url": "https://genesis.softy.pro/offre/5230?idt=105"
    },
    "-MHKm4txbsJkOe4ouln6": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2019-02-22 09:18:55",
      "description": "<p>&lt;span&gt;Genesis RH, est une&amp;nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&amp;nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&amp;nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&amp;nbsp;objectif est de vous trouver dans les meilleurs&amp;nbsp;délais une entreprise qui&amp;nbsp;partage vos valeurs et votre vision du monde professionnel&lt;/span&gt;.&amp;nbsp;&lt;br&gt;</p>",
      "experience": "Débutant accepté",
      "id": "5230_1",
      "location": "Le Creusot",
      "position": "<p>Vous avez déjà travaillé en tant qu'aide soignant(e) et vous étes mobile entre Chalon sur Saône et Le Creusot ?\n\nNous vous proposons des missions de courtes et longues durées en fonction de vos disponibilités dans le 71.\n\nNous recherchons des profils mobiles, volontaires et impliqués.\n\nVos missions : \n\n- aide à la toilette des patients\n- apporter les repas tout en respectant les différents régimes alimentaires\n- surveiller l'état physique et mental des patients pour anticiper d'eventuelles interventions\n- nettoyer les locaux du personnel et les chambres des patients</p>",
      "postcode": "71200",
      "profile": "<p>Nous cherchons des personnes motivées et mobiles.\n\nNous préparons les plannings en avance en fonction de vos disponiblités et de vos envies. Possibilité de travailler de week-end et de soir. Mais c'est vous qui décidez !\n\nPour ce métier de proximité et de service, vous devez justifiez d'un vrai savoir être \n\nSAVOIR ETRE : \n\n- serviable\n- sens de l'écoute\n- ponctuel\n\nVotre rémunération est comprise entre 13euros et 16euros de l'heure.\n\nVoiture nécessaire pour se rendre disponible sur différents postes de travail.\n\nSi ce poste vous intéresse, envoyez-nous votre candidature à l'adresse suivante : gestion.medical@genesisrh.fr</p>",
      "rome": "J1501",
      "salary": "15 €/heure",
      "title": "AIDE SOIGNANT - H/F",
      "url": "https://genesis.softy.pro/offre/5230?idt=105"
    },
    "-MHKm4v9WDGbdcuBqqVG": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2019-02-19 10:10:59",
      "description": "Genesis RH, ce n'est pas qu'une agence intérim.  C'est avant tout une équipe dynamique et à l'écoute. Notre priorité : vous trouver au plus vite un emploi qui répondra à vos envies.  Travail temporaire, CDD et CDI, nous vous trouvons dans les meilleurs délais une entreprise qui partage vos valeurs et votre vision du monde professionnel.",
      "experience": "Expérience exigée",
      "id": "5198_0",
      "location": "Chalon-sur-Saône",
      "position": "<p>Lecture de plans, </p><p>mesurer, </p><p>tracer, </p><p>réaliser une tuyauterie suivant plan ISO ou sans plan, à partir d'une prise de côtes sur la pièce Inox. </p><p>Réaliser des coupes droites au coupe tube ou à la disqueuse en vue d'un assemblage bout à bout de tubes.</p><p> Réaliser des coupes biaises sur éléments de tuyauterie. </p><p>Réaliser des soudures TIG (en position) de tubes inox bout à bout fines épaisseurs (1 à 4 mm) avec pénétration et protection gazeuse envers. Vérifier et contrôler les opérations réalisées.</p>",
      "postcode": "71100",
      "profile": "Tuyauteur confirmé et expérimenté",
      "rome": "H2902",
      "salary": "A définir suivant profil",
      "title": "Tuyauteur - H/F",
      "url": "https://genesis.softy.pro/offre/5198?idt=105"
    },
    "-MHKm4wK1w6r3c-9CyX1": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2018-12-06 14:52:21",
      "description": "<p>&lt;span&gt;Genesis RH, est une&amp;nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&amp;nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&amp;nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&amp;nbsp;objectif est de vous trouver dans les meilleurs&amp;nbsp;délais une entreprise qui&amp;nbsp;partage vos valeurs et votre vision du monde professionnel&lt;/span&gt;.&amp;nbsp;&lt;br&gt;</p>",
      "experience": "Débutant accepté",
      "id": "4406_0",
      "location": "Tarare",
      "position": "<p>Tu aimes rouler dans un camion SPL et tu as ton permis CE + FIMO à jour ?\n\nTu es disponible tout de suite ?\n\nNous te proposons une mission avec prise de poste sur Tarare, et passage à Saint Amour et Roanne.\n\nHoraires : 14h-22h \n\nVos missions seront de livrer deux caissons d'équarrissage à Saint Amour, de nettoyer votre camion puis de rentrer sur Roanne.\n\nSi tu sais que cette mission peut te convenir, ne perds plus de temps et postule à cette offre.</p>",
      "postcode": "69170",
      "profile": "<p>Nous cherchons une personne sérieuse, ponctuelle et volontaire. \n\nPense à te renseigner sur l'équarrissage pou ne pas être surpris !</p>",
      "rome": "N4101",
      "salary": "10 €/heure",
      "title": "CHAUFFEUR SPL - H/F - H/F",
      "url": "https://genesis.softy.pro/offre/4406?idt=105"
    },
    "-MHKm53Mow831ChSH6N2": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2018-12-06 14:52:21",
      "description": "<p>&lt;span&gt;Genesis RH, est une&amp;nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&amp;nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&amp;nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&amp;nbsp;objectif est de vous trouver dans les meilleurs&amp;nbsp;délais une entreprise qui&amp;nbsp;partage vos valeurs et votre vision du monde professionnel&lt;/span&gt;.&amp;nbsp;&lt;br&gt;</p>",
      "experience": "Débutant accepté",
      "id": "4406_1",
      "location": "L'Arbresle",
      "position": "<p>Tu aimes rouler dans un camion SPL et tu as ton permis CE + FIMO à jour ?\n\nTu es disponible tout de suite ?\n\nNous te proposons une mission avec prise de poste sur Tarare, et passage à Saint Amour et Roanne.\n\nHoraires : 14h-22h \n\nVos missions seront de livrer deux caissons d'équarrissage à Saint Amour, de nettoyer votre camion puis de rentrer sur Roanne.\n\nSi tu sais que cette mission peut te convenir, ne perds plus de temps et postule à cette offre.</p>",
      "postcode": "69210",
      "profile": "<p>Nous cherchons une personne sérieuse, ponctuelle et volontaire. \n\nPense à te renseigner sur l'équarrissage pou ne pas être surpris !</p>",
      "rome": "N4101",
      "salary": "10 €/heure",
      "title": "CHAUFFEUR SPL - H/F - H/F",
      "url": "https://genesis.softy.pro/offre/4406?idt=105"
    },
    "-MHKm54WW68PWQXuh_1b": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2018-12-06 14:52:21",
      "description": "<p>&lt;span&gt;Genesis RH, est une&amp;nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&amp;nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&amp;nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&amp;nbsp;objectif est de vous trouver dans les meilleurs&amp;nbsp;délais une entreprise qui&amp;nbsp;partage vos valeurs et votre vision du monde professionnel&lt;/span&gt;.&amp;nbsp;&lt;br&gt;</p>",
      "experience": "Débutant accepté",
      "id": "4406_2",
      "location": "Roanne",
      "position": "<p>Tu aimes rouler dans un camion SPL et tu as ton permis CE + FIMO à jour ?\n\nTu es disponible tout de suite ?\n\nNous te proposons une mission avec prise de poste sur Tarare, et passage à Saint Amour et Roanne.\n\nHoraires : 14h-22h \n\nVos missions seront de livrer deux caissons d'équarrissage à Saint Amour, de nettoyer votre camion puis de rentrer sur Roanne.\n\nSi tu sais que cette mission peut te convenir, ne perds plus de temps et postule à cette offre.</p>",
      "postcode": "42300",
      "profile": "<p>Nous cherchons une personne sérieuse, ponctuelle et volontaire. \n\nPense à te renseigner sur l'équarrissage pou ne pas être surpris !</p>",
      "rome": "N4101",
      "salary": "10 €/heure",
      "title": "CHAUFFEUR SPL - H/F - H/F",
      "url": "https://genesis.softy.pro/offre/4406?idt=105"
    },
    "-MHKm5JV9p-s8LF8lYyT": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2018-06-20 16:20:17",
      "description": "Genesis RH, ce n'est pas qu'une agence intérim.  C'est avant tout une équipe dynamique et à l'écoute. Notre priorité : vous trouver au plus vite un emploi qui répondra à vos envies.  Travail temporaire, CDD et CDI, nous vous trouvons dans les meilleurs délais une entreprise qui partage vos valeurs et votre vision du monde professionnel.",
      "experience": "Débutant accepté",
      "id": "3029_0",
      "location": "Bourgoin-Jallieu",
      "position": "Nous recherchons pour notre client situé sur Bourgoin-Jallieu, un(e) mécanicien(ne) spécialisé Poids Lourd afin de réaliser des réparations, révisions et contrôles périodiques sur camions poids lourds, véhicules professionnels, industriels et agricoles.",
      "postcode": "38300",
      "profile": "<p>Nous recherchons pour ce poste une personne avec une expérience en mécanique poids lourd :</p><p>- Débutant ou confirmé,</p><p>- Passionné de mécanique, </p><p>Votre profil nous intéresse !!</p>",
      "rome": "I1604",
      "salary": "De 1900 €/mois à 2600 €/mois",
      "title": "Mécanicien Poids Lourd - H/F",
      "url": "https://genesis.softy.pro/offre/3029?idt=105"
    },
    "-MHKm5Kh8OU2yTMRaBuq": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2018-06-18 11:27:22",
      "description": "Genesis RH, ce n'est pas qu'une agence intérim.  C'est avant tout une équipe dynamique et à l'écoute. Notre priorité : vous trouver au plus vite un emploi qui répondra à vos envies.  Travail temporaire, CDD et CDI, nous vous trouvons dans les meilleurs délais une entreprise qui partage vos valeurs et votre vision du monde professionnel.",
      "experience": "Expérience exigée",
      "id": "2981_0",
      "location": "Bourgoin-Jallieu",
      "position": "<p>Nous recherchons, pour notre client, PME située dans le Nord Isère, un monteur-soudeur H/F.</p><p> Intégré(e) à une petite structure, vous serez chargé(e) des missions suivantes : </p><p> - Etude du plan et travail préparatoire, lecture de plans,</p><p>- Assembler et pointer les éléments, </p><p> - Contrôler, </p><p> - Souder acier (sur monture de 10 à 15 cm d'épaisseur) </p><p> - Contrôler, rectifier et redresser</p>",
      "postcode": "38300",
      "profile": "<p>Vous bénéficiez d’une expérience professionnelle en tant que monteur-soudeur (h/f),</p><p>Vous savez&nbsp;lire un plan et êtes autonome sur de l'assemblage de structures. </p><p> Vous faites preuve de rigueur et de précision. </p><p>=&gt; Mission intérim renouvelable jusqu'à fin août minimum.</p>",
      "rome": "H2902",
      "salary": "12 €/heure",
      "title": "Soudeur-Monteur - H/F",
      "url": "https://genesis.softy.pro/offre/2981?idt=105"
    },
    "-MHKm5Lt0T--IvMG8iut": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2018-03-22 16:43:14",
      "description": "Genesis RH, ce n'est pas qu'une agence intérim.  C'est avant tout une équipe dynamique et à l'écoute. Notre priorité : vous trouver au plus vite un emploi qui répondra à vos envies.  Travail temporaire, CDD et CDI, nous vous trouvons dans les meilleurs délais une entreprise qui partage vos valeurs et votre vision du monde professionnel.",
      "experience": "Expérience souhaitée",
      "id": "2094_0",
      "location": "Bourgoin-Jallieu",
      "position": "<p>Nous recherchons pour notre client, petite entreprise du secteur berjalien, un chaudronnier H/F, dont les missions seront les suivantes :</p><p>• Déterminer les opérations de fabrication d'ensembles chaudronnés et préparer les matériaux </p><p>• Tracer les développés et reporter les cotes sur les matériaux (plaques, tubes, profilés, ...) </p><p>• Découper les éléments et les mettre à dimensions et en forme par pliage, cintrage, oxycoupage </p><p>• Marquer, positionner les pièces, plaques, tubes et les assembler (soudure-pointage, rivet, agrafe, colle, ...) </p><p>• Contrôler les pièces, l'assemblage et réaliser les finitions (meulage, ébavurage, redressage, ...) </p><p>• Renseigner les supports qualité et de suivi de production/réalisation (incidents, interventions, ...) </p><p>• Réaliser des opérations de traitement thermique (recuit, trempe, revenu), de découpage ou de formage </p><p>• Calculer des développés en fonction de paramètres (matière, épaisseur, outils, rayons, ...)</p>",
      "postcode": "38300",
      "profile": "<p>Diplômé(e) en chaudronnerie ou serrurerie métallerie</p><p>Précision, rigueur et professionnalisme sont vos principales qualités au travail ?</p><p>Contactez-nous !</p><p>agence.bourgoin@genesisrh.fr</p><p><br></p>",
      "rome": "H2902",
      "salary": "13 €/heure",
      "title": "chaudronnier - H/F",
      "url": "https://genesis.softy.pro/offre/2094?idt=105"
    },
    "-MHKm5N4-lQWjY3nDOTp": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2018-02-12 14:50:47",
      "description": "<p>&lt;span&gt;Genesis RH, est une&amp;nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&amp;nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&amp;nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&amp;nbsp;objectif est de vous trouver dans les meilleurs&amp;nbsp;délais une entreprise qui&amp;nbsp;partage vos valeurs et votre vision du monde professionnel&lt;/span&gt;.&amp;nbsp;&lt;br&gt;</p>",
      "experience": "Débutant accepté",
      "id": "1715_0",
      "location": "Chalon-sur-Saône",
      "position": "<p>Nous recherhcons pour l'un de nos clients spécialisé dans la chaudronnerie, du tracage de pièces à la mise en forme, un chaudronnier H/F confirmé : \n\n- Préparation de chantier \n- Lecture de plans\n- Etude du dessin à tracer et vérification des côtes\n- Traçage: report en grandeur nature sur les matériaux (plaques, tubes, profilés) des indications de forme et de cotes fournies par le dessin\n- Découpe suivant le tracé et mise en forme des pièces (pliage, ...)\n- Assemblage et montage de l'ensemble, pièce par pièce, selon le plan à construire et vérification\n- Soudage et/ou collage des pièces \n- Réalisations des finitions\n- Renseignement des documents de production\n- Vous travaillez tous les matériaux tels que : L’acier, L’inox, L’aluminium …\n- Vous réalisez tout type d’ensemble chaudronné de toute forme et dimension</p>",
      "postcode": "71100",
      "profile": "<p>Vous êtes issu d'une formation en chaudronnerie, et vous avez une expérience significative dans ce domaine.\n\nLe CACES Nacelle serait un plus</p>",
      "rome": "H2902",
      "salary": "A définir suivant profil",
      "title": "Chaudronnier - H/F",
      "url": "https://genesis.softy.pro/offre/1715?idt=105"
    },
    "-MHKm5OJcFxbhEKx4GOZ": {
      "contract_type": "Intérim",
      "country": "France",
      "date": "2017-12-27 08:06:55",
      "description": "<p>&lt;span&gt;Genesis RH, est une&amp;nbsp;agence d'emploi spécialisée dans l'expertise métier (intérim, CDD, CDI). Une&amp;nbsp;équipe dynamique et à l'écoute pour vous accompagner dans votre recherche&amp;nbsp;d'emploi qui répondra à vos envies, vos attentes et à votre expérience. Notre&amp;nbsp;objectif est de vous trouver dans les meilleurs&amp;nbsp;délais une entreprise qui&amp;nbsp;partage vos valeurs et votre vision du monde professionnel&lt;/span&gt;.&amp;nbsp;&lt;br&gt;</p>",
      "experience": "Débutant accepté",
      "id": "1387_0",
      "location": "Chalon-sur-Saône",
      "position": "<p>- Excellent niveau et logique électrique\n\n- Lecture de schémas et modification de schémas\n\n- Câblage électrique\n\n- Mise en œuvre de programmes\n\n- Recherche de panne\n\n- Capacité d’intégration de nouveaux équipements\n\n- Rédaction des fiches techniques d’intervention (dossier de maintenance des machines) et renseignement au niveau de la GMAO (Gestion de la maintenance assistée par ordinateur).\n\n- Participation à l’amélioration des procédures de maintenance.\n\n- Mise en place de dispositifs plus performants pour augmenter le rendement et la longévité des machines.</p>",
      "postcode": "71100",
      "profile": "<p>- Issu d'une formation BAC ou BAC+2 dans ce domaine, vous avez d'excellentes connaissances en électricité\n\n- Vos habilitations électriques sont à jour\n\n- Vous avez également des connaissances en mécanique, automatisme \n\n- Vous acceptez les déplacements\n\n- Vous êtes impérativement titulaire du Permis B</p>",
      "rome": "I1304",
      "salary": "A définir suivant profil",
      "title": "Electromécanicien - H/F",
      "url": "https://genesis.softy.pro/offre/1387?idt=105"
    }
  }

  try {
    return firebase.database().ref(`${JOB_TABLE_NAME}`)
      .set(jobs).then(() => {
        return null;
      });
  } catch (e) {
    return e;
  }
}

export async function createDummyMessages() {
  let messages = {
    "-MBC5lHoTRfthA545X7Y": {
      "userId": "-MBC5lHoTRfthA545U7Y",
      "subject": "Demande",
      "email": "alex@gmail.com",
      "content": "Test content"
    },
    "-MBC6RCGSgLNcGJylySi": {
      "userId": "-MBC5lHoTRfthA545U7Y",
      "subject": "Autre",
      "email": "james@gmail.com",
      "content": "Test content"
    }
  }

  try {
    return firebase.database().ref(`${CONTACT_US_TABLE_NAME}`)
      .set(messages).then(() => {
        return null
      });
  } catch (e) {
    return e
  }
}

export async function addAdminContactMessage(message) {
  try {
    const userId = await getCurrentUserId()
    const strDate = `${Date.now()}`
    const data = {
      ...message,
      userId: userId,
      createdAt: strDate,
      checked: false,
    }
    return firebase.database().ref(`${CONTACT_US_TABLE_NAME}/${strDate}`)
      .set(data).then(() => {
        return data;
      });
  } catch (e) {
    return e;
  }
}

export async function addJobToFavorite(job, currentUser) {
  if (currentUser.favoriteJobs == null) {
    currentUser.favoriteJobs = []
  }

  let removeIndex = - 1
  for (let index = 0; index < currentUser.favoriteJobs.length; index++) {
    if (currentUser.favoriteJobs[index] == job.id) {
      removeIndex = index
      break
    }
  }
  if (removeIndex != -1) {
    currentUser.favoriteJobs.splice(removeIndex)
  }
  else {
    currentUser.favoriteJobs.push(job.id)
  }

  const uid = await getCurrentUserId()
  if (uid) {
    return firebase.database().ref(`${USER_TABLE_NAME}/${uid}`)
      .update(currentUser).then(() => {
        return uid
      });
  }
  return null;
}

export async function addJobToApplyList(job, currentUser) {
  if (currentUser.appliedJobs == null) {
    currentUser.appliedJobs = []
  }

  let removeIndex = - 1
  for (let index = 0; index < currentUser.appliedJobs.length; index++) {
    if (currentUser.appliedJobs[index] == job.id) {
      removeIndex = index
      break
    }
  }
  if (removeIndex != -1) {
    currentUser.appliedJobs.splice(removeIndex)
  }
  else {
    currentUser.appliedJobs.push(job.id)
  }

  const uid = await getCurrentUserId()
  if (uid) {
    return firebase.database().ref(`${USER_TABLE_NAME}/${uid}`)
      .update(currentUser).then(() => {
        return uid
      });
  }
  return null;
}

export async function getJobsById(id) {
  return firebase.database()
    .ref(`${MAPS_TABLE_NAME}/${category}/${id}`)
    .once('value')
    .then((snapshot) => {
      if (snapshot.exists) return snapshot.val();
      else return null;
    });
}

export async function getJobsForJobIds(jobIds) {
  var items = []
  return firebase.database().ref(`${JOB_TABLE_NAME}`)
    .once('value')
    .then((snapshot) => {
      if (snapshot.exists) {
        items = []
        snapshot.forEach((child) => {
          var item = { ...child.val(), _id: child.key }
          if (jobIds.includes(item.id)) {
            items.push(item)
          }
        })
        return items
      } else {
        throw new Error('Job table does not exist')
      }
    })
}

export function getLocalJobsForJobIds(jobs, jobIds) {
  let items = []
  for (let index = 0; index < jobs.length; index++) {
    let item = jobs[index]
    if (jobIds.includes(item.id)) {
      items.push(item)
    }
  }
  return items
}

export async function getJobsByCriteria(title, activityArea, contractType, city) {
  var items = []
  return firebase.database().ref(`${JOB_TABLE_NAME}`)
    .once('value')
    .then((snapshot) => {
      if (snapshot.exists) {
        items = []
        snapshot.forEach((child) => {
          var item = { ...child.val(), _id: child.key }
          if (item.duration == null) {
            item.duration = "ASAP"
          }
          items.push(item)
        })
        return filterJobsByCriteria(items, title, activityArea, contractType, city)
      } else {
        throw new Error('Job table does not exist')
      }
    })
}

export function filterJobsByCriteria(allJobs, title, activityArea, contractType, city) {
  let items = []
  for (var index = 0; index < allJobs.length; index++) {
    let item = allJobs[index]
    if (item.duration == null) {
      item.duration = "ASAP"
    }
    let meetCriteria = true
    if (!item.title.includes(title)) {
      meetCriteria = false
    }
    if (!item.location.includes(city)) {
      meetCriteria = false
    }
    if (!item.contract_type.includes(contractType)) {
      meetCriteria = false
    }
    if (meetCriteria) {
      items.push(item)
    }
  }
  return items
}

export async function getAllJobs() {
  var items = []
  var printed = false
  return firebase.database().ref(`${JOB_TABLE_NAME}`)
    .once('value')
    .then((snapshot) => {
      if (snapshot.exists) {
        items = []
        snapshot.forEach((child) => {
          var item = { ...child.val(), _id: child.key }
          if (item.duration == null) {
            item.duration = "ASAP"
          }
          items.push(item)
          if (!printed) {
            printed = true
          }
        })
        return items
      } else {
        throw new Error('Job table does not exist')
      }
    })
}
