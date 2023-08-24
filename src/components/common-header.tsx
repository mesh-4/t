import CommonHeaderEntry from "@/components/common-header-entry"
import BrandIcon from "@/components/marketing/brand-icon"

type CommonHeaderProps = {
  isAuth?: boolean
}

const CommonHeader = ({ isAuth = false }: CommonHeaderProps) => {
  return (
    <div className=" mx-auto py-[30px] w-[95%] relative">
      <header className="flex w-full items-center justify-between">
        <div className="flex items-center space-x-2">
          <BrandIcon className="w-7 h-7" />
          <p className="font-semibold text-lg">T</p>
        </div>

        <div className="flex">
          <CommonHeaderEntry isAuth={isAuth} />
        </div>
      </header>
    </div>
  )
}

export default CommonHeader
