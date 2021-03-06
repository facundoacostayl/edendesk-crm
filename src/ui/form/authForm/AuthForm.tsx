interface Props extends React.FormHTMLAttributes<HTMLFormElement> {
    children: React.ReactNode;
}

export const AuthForm: React.FC<Props> = ({children, ...props}) => {
  return (
        <form className="w-[95%] max-w-[600px] bg-white border border-slate-100 rounded-md mx-auto flex flex-col py-5 px-3 xl:px-5" {...props}>
            {children}
        </form>
  )
}
