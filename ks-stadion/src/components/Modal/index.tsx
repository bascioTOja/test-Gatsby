import { Modal } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import React, { useState } from 'react'

const ModalComponent = () => {
  const [open, setOpen] = useState<boolean>(true)

  return (
    <Modal
      open={open}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClose={() => setOpen(false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <p style={{ maxWidth: '1200px', fontSize: '1.6rem', background: '#FFF', padding: '30px', maxHeight: '180px', overflow: 'scroll' }}>
        Strona została wykonana w oparciu o stronę <a href="http://ksstadion.com/">Ksstadiion</a>, może zawierać grafiki oraz treści z tego
        adresu. Jak i również wizerunki osób które wcześniej zostały opublikoawne pod wcześniej wymienionym adresem, ze strony nie są
        czerpane żadne korzyści majątkowe. Niektóre wizerunki również mogą być pobrane ze strony{' '}
        <a href="https://jbacademy.pl/">jbcacademy </a>Strona jest stworzona w celach demonstracyjnych oraz edukacyjnych, aby zobaczyć
        możliwości technolgii Gatsby, do wordpressa i zoptymalizowania czasu wykonywanych zapytań po stronie serwera ProtrainUp. Róznice
        można zobaczyć poruszając się po tych dwóch stronach. W razie potrzeby kontaktu proszę się kontaktować mailowo:{' '}
        <a href="mailto:zilibdev@gmail.com">zilibdev@gmail.com</a>
        <Button
          color="primary"
          size="large"
          variant="contained"
          style={{ display: 'block', fontSize: '1.6rem', margin: '20px auto', marginBottom: 'none' }}
          onClick={() => setOpen(false)}
        >
          Zamknij okienko
        </Button>
      </p>
    </Modal>
  )
}

export default React.memo(ModalComponent)
