import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
        en: {
            translation: {
                hours: 'Hour(s)',
                minutes: 'Minute(s)',
                ago: "Ago",
                last_brewing_time:"Last Brewing Time:",
                buildings: "Buildings",
                tea_rooms: "Tea Rooms",
                tea_room_gadget: "Tea Room Gadget",
                room: "Room",
                floor: "Floor",
                status: "Status",
                ready: "Ready",
                ready_in: "Ready In",
                now: "Now",
                getting_ready:"Getting Ready",
                tea_ran_out: "Tea Ran Out",
                language:"EN"
            },
        },
        tr: {
            translation: {
                hours: 'Saat',
                minutes: "Dakika",
                ago: "Önce",
                last_brewing_time:"Son Demlenme Tarihi:",
                buildings: "Binalar",
                tea_rooms: "Çay Odaları",
                tea_room_gadget: "Çay Odası Cihazı",
                room: "Oda",
                floor: "Kat",
                status: "Durum",
                ready: "Hazır",
                ready_in: "Hazır Olacak",
                now:"Şimdi",
                getting_ready:"Hazırlanıyor",
                tea_ran_out: "Çay Bitti",
                language:"TR"
            },
        },
    },
    fallbackLng: 'en', // Default language
    debug: true, // Enable debugging
    interpolation: {
      escapeValue: false, // Allow string interpolation
    },
  });

export default i18n;