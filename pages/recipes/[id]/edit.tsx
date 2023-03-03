import { useRouter } from 'next/router'

export const EditRecipe = () => {
    const router = useRouter()
    const { id } = router.query

    return (
        <>
            <p>hallo vom edit des rezeptes {id}</p>
        </>
    )
}

export default EditRecipe
