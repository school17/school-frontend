import namor from 'namor'

const range = (len: any) => {
  const arr: any= []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newPerson = () => {
  const statusChance = Math.random()
  return {
    name: namor.generate({ words: 1, numbers: 0 }),
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    image: statusChance > 0.70 ? 'https://i.ytimg.com/vi/7Xu_s1YJhyg/maxresdefault.jpg' :
    statusChance > 0.50 ? 'https://asset1.modelmanagement.com/mm-eyJ0Ijp7InIiOiIzMjAi/fSwiaWQiOiJpNjI0MzQ5/MSIsImYiOiJqcGcifQ;;.jpg' :
    statusChance > 0.25 ? 'https://www.irreverentgent.com/wp-content/uploads/2018/03/Awesome-Profile-Pictures-for-Guys-look-away2.jpg' :
     'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTecOfjQvwGtwJf2sKG67szwVAPx__kvg2NbHDZaW_Ul6-Ojsj-&usqp=CAU',
    status:
      statusChance > 0.66
        ? 'relationship'
        : statusChance > 0.33
        ? 'complicated'
        : 'single',
    status1:
      statusChance > 0.66
        ? 'relationship'
        : statusChance > 0.33
        ? 'complicated'
        : 'single',
  }
}

export default function makeData(...lens: any[]) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth]
    return range(len).map((d:any) => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}
