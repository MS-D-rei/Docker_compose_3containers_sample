import '@/components/UI/ErrorAlert.css'

interface ErrorAlertProps {
  errorText: string;
}

export default function ErrorAlert({errorText}: ErrorAlertProps) {
  return (
    <section className='error-alert'>
      <h2>Something went wrong</h2>
      <p>{errorText}</p>
    </section>
  )
}