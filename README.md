# monitoraggio-spese
Gestionale per monitorare entrate e uscite mensili. <br>
## Tecnologie usate
Tecnologie usate: HTML, CSS, JavaScript con localStorage.

## Come funziona
Inserisci la cifra in entrata e scegli la tipologia, stipendio o altro e clicchi il bottone imposta budget. <br>
Questo lo vedrai apparire nel tuo budget e nel tuo saldo e nella tabella delle transazioni. <br>
Successivamente inserisci una breve descrizione della spesa che hai fatto, l'importo e la tipologia di spesa e clicchi il bottone imposta spesa. <br>
Vedrai appare il totale delle spese uscite e il saldo che diminuisce. <br>
Questa la vedrai sempre sempre nella tabella delle transazioni. <br>
Il bottone Rest mese ti permette di svuotare tutti i campi. <br>
Se i campi sono vuoti e premi il bottone, ti esce un popup dicendoti che i campi sono vuoti, altrimenti un popup con la scelta di svuotare i campi o meno. <br>
Tutto questo salvato nel localStorage <strong>(per questa funzione, mi sono fatto aiutare dall'AI, nello specifico da Claude)</strong>.

## Design intuitivi
Il budget e il saldo, verranno visti in verde, anche nella transazione.
Mentre le uscite in rosso.
Le uscite e il saldo cambiano colore in base alla percentuale di uscite e di saldo rimanente. 

## Come funzionano i colori

Colore verde = uscite e saldo nella norma. <br>
Colore arancione = le uscite iniziano a diventare alte e il saldo inizia ad essere basso. <br>
Colore rosso = le uscite sono estremamente alte per il budget a disposizione e il saldo è estremamente basso da rischiare di andare in negativo.
