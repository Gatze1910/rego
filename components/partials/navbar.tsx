import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '../../context/AuthContext'

const Navbar = ({ children }: { children: React.ReactNode }) => {
  const { user, logOut } = useAuth()
  const router = useRouter()

  const menuItems = [
    {
      id: 1,
      name: 'Home',
      link: '/',
    },
    {
      id: 2,
      name: 'Login',
      link: '/login',
    },
    {
      id: 3,
      name: 'Sign Up',
      link: '/users/register',
    },
  ]

  const handleLogout = async () => {
    try {
      await logOut()
      router.push('/login')
    } catch (error: any) {
      console.log(error.message)
    }
  }
  return (
    <>
      <header>
        <nav>
          <ul>
            <>
              {!user.uid ? (
                menuItems.map((item) => (
                  <li key={item.id}>
                    <Link legacyBehavior href={item?.link}>
                      <a href="">{item?.name}</a>
                    </Link>
                  </li>
                ))
              ) : (
                <>
                  <li>
                    <Link legacyBehavior href="/shops/create">
                      <a href="">register a shop</a>
                    </Link>
                  </li>
                  <li>
                    <a onClick={handleLogout}>Logout</a>
                  </li>
                </>
              )}
            </>
          </ul>
        </nav>
      </header>
      {children}
    </>
  )
}

export default Navbar
