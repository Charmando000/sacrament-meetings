import type { SacramentMeeting } from "./types";

const meetings: SacramentMeeting[] = [
      {
    id: 1,
    date: "2026-09-20",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Jones",
    announcements: ["Ward temple night: September 27"],
    openingHymn: {
      number: 2,
      title: "The Spirit of God",
    },
    openingPrayer: "Sister Williams",
    wardBusiness: [
      {
        description: "Sustaining of new Primary president",
      },
    ],
    stakeBusiness: false,
    sacramentHymn: {
      number: 169,
      title: "In Remembrance of Thy Suffering",
    },
    speakers: [
      {
        name: "Sister Brown",
        topic: "Faith in Jesus Christ",
        type: "speaker",
      },
      {
        name: "Youth Choir",
        topic: "",
        type: "musical-number",
      },
    ],
    closingHymn: {
      number: 31,
      title: "O God, Our Help in Ages Past",
    },
    closingPrayer: "Brother Davis",
  },
    {
    id: 2,
    date: "2026-05-03",
    meetingType: "testimony",
    presiding: "Bishop Anderson",
    conducting: "Brother Miller",
    announcements: [
      "Youth activity: May 9",
      "Temple preparation class: May 10",
    ],
    openingHymn: {
      number: 85,
      title: "How Firm a Foundation",
    },
    openingPrayer: "Sister Johnson",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: {
      number: 193,
      title: "I Stand All Amazed",
    },
    speakers: [
      {
        name: "Ward Members",
        topic: "Personal testimonies",
        type: "speaker",
      },
    ],
    closingHymn: {
      number: 219,
      title: "Because I Have Been Given Much",
    },
    closingPrayer: "Brother Clark",
  },

  {
    id: 3,
    date: "2026-05-10",
    meetingType: "regular",
    presiding: "Bishop Anderson",
    conducting: "Sister Taylor",
    announcements: ["Ward picnic: May 16"],
    openingHymn: {
      number: 89,
      title: "The Lord Is My Light",
    },
    openingPrayer: "Brother Wilson",
    wardBusiness: [
      {
        description: "Sustaining of ward officers",
      },
    ],
    stakeBusiness: true,
    sacramentHymn: {
      number: 185,
      title: "Reverently and Meekly Now",
    },
    speakers: [
      {
        name: "Brother Martinez",
        topic: "Serving Others",
        type: "speaker",
      },
      {
        name: "Sister Lee",
        topic: "Following the Savior",
        type: "speaker",
      },
    ],
    closingHymn: {
      number: 96,
      title: "Dearest Children, God Is Near You",
    },
    closingPrayer: "Sister Garcia",
  },

  {
    id: 4,
    date: "2026-05-17",
    meetingType: "stake",
    presiding: "President Thompson",
    conducting: "Brother Harris",
    announcements: ["Stake conference follow-up meeting: May 24"],
    openingHymn: {
      number: 30,
      title: "Come, Come, Ye Saints",
    },
    openingPrayer: "Brother Adams",
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: {
      number: 181,
      title: "Jesus of Nazareth, Savior and King",
    },
    speakers: [
      {
        name: "President Thompson",
        topic: "Faith and Discipleship",
        type: "speaker",
      },
      {
        name: "Sister Evans",
        topic: "The Power of Service",
        type: "speaker",
      },
    ],
    closingHymn: {
      number: 220,
      title: "Lord, I Would Follow Thee",
    },
    closingPrayer: "Sister Adams",
  },

  {
    id: 5,
    date: "2026-09-13",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Jones",
    announcements: ["Ward temple night: September 27"],
    openingHymn: {
      number: 2,
      title: "The Spirit of God",
    },
    openingPrayer: "Sister Williams",
    wardBusiness: [
      {
        description: "Sustaining of new Primary president",
      },
    ],
    stakeBusiness: false,
    sacramentHymn: {
      number: 169,
      title: "In Remembrance of Thy Suffering",
    },
    speakers: [
      {
        name: "Sister Brown",
        topic: "Faith in Jesus Christ",
        type: "speaker",
      },
      {
        name: "Youth Choir",
        topic: "",
        type: "musical-number",
      },
    ],
    closingHymn: {
      number: 31,
      title: "O God, Our Help in Ages Past",
    },
    closingPrayer: "Brother Davis",
  },
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) {
    return meetings.filter((meeting) => meeting.date === date);
  }

  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find((meeting) => meeting.id === id) ?? null;
}