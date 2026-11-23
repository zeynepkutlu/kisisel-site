// Sitede kullanılan ikonlar. @mdi/js'den tek tek import edildiği için sadece bunlar siteye girer
// (eskiden 7000'den fazla ikonun fontu ve CSS'i yükleniyordu).
//
// Kullanım: <v-icon icon="$github" /> ya da prepend-icon="$send" ($ işareti "takma ad" demek)
// Yeni ikon eklemek: 1) https://pictogrammers.com/library/mdi/ adresinden seç
//                    2) aşağıda import et (mdi-home-outline → mdiHomeOutline)  3) listeye bir satır ekle
import {
  mdiAccountGroupOutline,
  mdiAccountOutline,
  mdiBookshelf,
  mdiEmailOutline,
  mdiFormatListChecks,
  mdiGithub,
  mdiHomeOutline,
  mdiInstagram,
  mdiLinkedin,
  mdiMessageOutline,
  mdiMicrophoneOutline,
  mdiMoonWaningCrescent,
  mdiMovieOpenOutline,
  mdiNotebookEditOutline,
  mdiPaletteOutline,
  mdiPlay,
  mdiPostOutline,
  mdiSend,
  mdiShuffleVariant,
  mdiWeb,
  mdiWhiteBalanceSunny,
  mdiYoutube,
} from '@mdi/js'

export const siteIcons = {
  'account-group-outline': mdiAccountGroupOutline,
  'account-outline': mdiAccountOutline,
  bookshelf: mdiBookshelf,
  'email-outline': mdiEmailOutline,
  'format-list-checks': mdiFormatListChecks,
  github: mdiGithub,
  'home-outline': mdiHomeOutline,
  instagram: mdiInstagram,
  linkedin: mdiLinkedin,
  'message-outline': mdiMessageOutline,
  'microphone-outline': mdiMicrophoneOutline,
  'moon-waning-crescent': mdiMoonWaningCrescent,
  'movie-open-outline': mdiMovieOpenOutline,
  'notebook-edit-outline': mdiNotebookEditOutline,
  'palette-outline': mdiPaletteOutline,
  play: mdiPlay,
  'post-outline': mdiPostOutline,
  send: mdiSend,
  'shuffle-variant': mdiShuffleVariant,
  web: mdiWeb,
  'white-balance-sunny': mdiWhiteBalanceSunny,
  youtube: mdiYoutube,
}
