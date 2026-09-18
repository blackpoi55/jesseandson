export const site = {
  name: "Jesse & Son",
  legalName: "Jesse & Son Co.,Ltd",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.jesseandson.com",
  email: "info@jesseandson.com",
  phone: "+66814437747",
  phoneDisplay: "+66 81 443 7747",
  landline: "+6622526171",
  landlineDisplay: "+66 2 252 6171",
  line: {
    id: "jesseandson",
    url: "https://line.me/ti/p/~jesseandson",
  },
  whatsapp: "https://wa.me/66814437747",
  address: {
    street: "1/15 Sukhumvit Soi 10, Asoke, Khlong Toei",
    city: "Bangkok",
    postalCode: "10110",
    country: "TH",
    lines: ["1/15 Sukhumvit Soi 10, Asoke", "Khlong Toei, Bangkok 10110", "Thailand"],
  },
  hours: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "10:00",
    closes: "20:00",
  },
  social: {
    facebook: "https://www.facebook.com/jesseandson",
    instagram: "https://www.instagram.com/jesseandson",
    tripadvisor:
      "https://www.tripadvisor.com/Attraction_Review-g293916-d6915984-Reviews-Jesse_and_Son_Custom_Tailors-Bangkok.html",
    googleMaps: "https://maps.app.goo.gl/zSqV915Ajvv4TGTi8",
    googleReviews: "https://maps.app.goo.gl/L9EBm6NfToTryt5Z6",
    youtubeId: "4kfudhIg9a8",
  },
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d124017.21321901615!2d100.524473!3d13.746403!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29ee47f1b904d%3A0x8ce98cab775dcf12!2sJesse%20%26%20Son%20(Custom%20Tailors)!5e0!3m2!1sen!2sth!4v1778639603667!5m2!1sen!2sth",
} as const;
