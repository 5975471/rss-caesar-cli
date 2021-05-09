# caesar-cli

**инструмент для решения задачи #1 курса rss school**

аргументы командной строки

- -a, --action - encode | decode
- -s, --shift - shift
- -i, --input - input [file | stdin]
- -o, --output - output [file | stdout]

**usage**

`node index -a[--action] [encode|decode] -s[--shift] (number) -i[--input] (string) -o[--output] (string)`

пример

`node index -a encode -s -2 -i in.txt -o out.txt`

`node index -a decode -s 20 `

**сделано**

- - `action`, `shift` are required, при отсутствии `action` или его значения показывается человекочитаемая ошибка и программа завершается с кодом 1, при отсутствии значения `shift` он считается = 0
- - если в аргументах нет input || output - читается || пишется в stdin || stdout соответственно
- - если в аргументах `inputFile || outputFile` есть, а самих файлов нет, показывается человекочитаемая ошибка и программа завершается с кодом 1
- - если с параметрами все ок, то на выходе (stdin || ouputFile) появляется "закодированная" || "раскодированная" строка
- - при записи в файл инфа дописывается
- - в работу берутся только буквы англ. алфавита в двух регистрах, остальные символы игнорятся
- - проверено на linux, node v14.15.0

**не сделано**

- проверка на file readonly
- проверка на относительный\абсолютный путь
- не проверял на windows
