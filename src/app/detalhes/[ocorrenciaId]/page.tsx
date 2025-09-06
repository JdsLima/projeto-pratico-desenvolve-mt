export default async function Details({
  params,
}: {
  params: Promise<{ ocorrenciaId: string }>
}) {
  const { ocorrenciaId } = await params
 
  return (
    <div>
        teste {ocorrenciaId}
    </div>
  )
}