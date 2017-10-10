

export default function commentInsertions(hpxml: string): string {

  const baseComment = `<!--========================== Base ===========================================-->
  <Building>`

  const impComment = `</Building>
  <!--========================== Imp ============================================-->`

  const projectComment = `<!--========================== Project ========================================-->
  <Project>`

  return hpxml
    .replace(/<Building>/, baseComment)
    .replace(/<\/Building>/, impComment)
    .replace(/<Project>/, projectComment)
}
