import CommonHeaderEntry from "@/components/common-header-entry"

type CommonHeaderProps = {
  isAuth?: boolean
}

const CommonHeader = ({ isAuth = false }: CommonHeaderProps) => {
  return (
    <div className=" mx-auto py-[30px] w-[95%] h-screen relative">
      <header className="flex w-full items-center justify-between">
        <p className="font-semibold text-lg">Timebox</p>

        <div className="flex">
          <CommonHeaderEntry isAuth={isAuth} />
        </div>
      </header>
    </div>
  )
}

export default CommonHeader
