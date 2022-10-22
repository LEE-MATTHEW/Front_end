export function Fallback() {
  return (
    <div className="h-24 flex justify-center items-center bg-gray-100">
      <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin">
      </div>
    </div>
  )
}

export function Loading({isLoaded}) {
  if (isLoaded===false) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-20 z-10">
        <div className="h-full flex justify-center items-center">
          <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }
}

export function ErrorMessage({error}) {
  const message = (
      <div className="fixed right-0 bottom-0 left-0 p-1 bg-white z-10 border">
        <p className="text-red-500">{error}</p>
      </div>
  )
 
  if (error) {
    return message;
  }
}

export function SucessMessage({message}) {
  if (message) {
    return (
      <div className="fixed right-0 bottom-0 left-0 p-1 bg-white z-10 border">
        <p className="text-blue-500">{message}</p>
      </div>
    )
  }
}