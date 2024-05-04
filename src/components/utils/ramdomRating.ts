import { IRating, IRatingStar } from "../../interfaces/products.js";
import { generateRandomDate } from "./randomDate.js";

export function fillProductRating(clientList: string[], comments: string[], votes: number = 10) {
  const rating: IRating = {
    star_1: [],
    star_2: [],
    star_3: [],
    star_4: [],
    star_5: []
  }

  const randomNumber = Math.floor(Math.random() * votes) + 1

  for (let i = 0; i < randomNumber; i++) {
    const start = Math.floor(Math.random() * 5) + 1
    const client = {_id: `${start}-${i}`, name: clientList[Math.floor(Math.random() * clientList.length)]}
    const conment = comments[Math.floor(Math.random() * comments.length)]
    const date = generateRandomDate()
    const ratingStar: IRatingStar = { client: client, conment: conment, date: date }
    switch (start) {
      case 1:
        rating.star_1.push(ratingStar)
        break
      case 2:
        rating.star_2.push(ratingStar)
        break
      case 3:
        rating.star_3.push(ratingStar)
        break
      case 4:
        rating.star_4.push(ratingStar)
        break
      case 5:
        rating.star_5.push(ratingStar)
        break
      default:
        break
    }
  }

  return rating
}