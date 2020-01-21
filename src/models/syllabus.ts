export interface Syllabus {
  id: String,
  state?: String,
  mode: String,
  grade: String,
  subject:String,
  chapter: chapter[]

}

export interface chapter {
  id?: String,
  chapterNumber: String,
  chapterName: String,
  topics: []
}