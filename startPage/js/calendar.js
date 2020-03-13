monthsName = ['Январь', 'Февраль','Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
daysCount  = [31,28,31,30,31,30,31,31,30,31,30,31]
startDays  = [2,5,5,1,3,6,1,4,7,2,5,7]
images = [
				'img/calendar/jan.jpg',
				'img/calendar/feb.jpg',
				'img/calendar/mar.jpg',
				'img/calendar/apr.jpg',
				'img/calendar/may.jpg',
				'img/calendar/jun.jpg',
				'img/calendar/jul.jpg',
				'img/calendar/aug.jpg',
				'img/calendar/sep.jpg',
				'img/calendar/oct.jpg',
				'img/calendar/nov.jpg',
				'img/calendar/dec.jpg'
]

lastMonth = -1
currentWidth = 0

function addCalendar()
{
	if(window.screen.width < window.screen.height) createMobileCalendar();
	else nextCalendar();
}

function dayClick()
{
	timestamp = event.target.getAttribute('timestamp')
	alert(new Date(timestamp))
}

function nextCalendar()
{
	width = window.innerWidth
	monthCount = Math.floor(width / 400)

	if((lastMonth+monthCount) == 12) return
	lastMonth = lastMonth + 1
	calendar = document.getElementById('calendar')
	calendar.innerHTML = ''

	calendar.append(createCalendar())

	return calendar
}

function prevCalendar()
{
	if(lastMonth == 0) return
	lastMonth = lastMonth - 1
	calendar = document.getElementById('calendar')
	calendar.innerHTML = ''

	calendar.append(createCalendar())

	return calendar
}

function clearCalendarDayColor()
{
	btns = document.getElementsByClassName('waves-effect waves-light btn')
	
	for(i = 0; i < btns.length;i++)
		btns[i].style.background = '#26a69a'
}

function activateEventDays(days)
{
	for(i = 0; i < days.length;i++)
	{
		date = new Date(days[i])
		date.setHours(0)
		date.setUTCMinutes(0)
		date.setUTCSeconds(0)
		
		btn = document.getElementById(date.getTime() / 1000)
		btn.style.background = '#f00' 
	}
}

function createMobileCalendar()
{
	 div = document.createElement('div')
	 div.style.width  = '100%'
	 

	 slider = document.createElement('div')
	 slider.className = "carousel carousel-slider"
	 slider.style.height = '700'

	 document.body.append(slider)

	 for(n = 0; n < 12;n++)
	 {
		 item = document.createElement('a')
		 item.className = 'carousel-item'

		 item.append(createMonthCard(images[n],n,true))
		 slider.append(item)
	 }
}

function createCalendar()
		{
			calendar = document.createElement('table')
			tr = document.createElement('tr')

			prevButton = document.createElement('div')
			prevButton.className = 'arrow-right'
			prevButton.setAttribute('onclick', 'prevCalendar()')

			bCell = document.createElement('td')
			bCell.style.padding = '0px 0px'
			bCell.style.verticalAlign = 'inherit'


			bCell.append(prevButton)

			tr.append(bCell)

			width = window.innerWidth
			monthCount = Math.floor(width / 400)

			for(k = lastMonth; k < monthCount + lastMonth;k++)
			{
				td = document.createElement('td')
				td.append(createMonthCard(images[k],k,false))
				td.width = 10
				tr.append(td)
			}

			bCell = document.createElement('td')
			bCell.style.padding = '0px 0px'
			bCell.style.verticalAlign = 'inherit'
			
			prevButton = document.createElement('div')
			prevButton.className = 'arrow-left'
			prevButton.setAttribute('onclick', 'nextCalendar()')

			bCell.append(prevButton)

			tr.append(bCell)

			calendar.append(tr)
			calendar.style.background = '#eee'

			return calendar
		}

function createMonthCard(imagePath, monthNumber,mobile)
{
	card = document.createElement('div')
	card.className = 'card'
	card.style.width = "100%"
	card.style.height = 460


	image = document.createElement('div')
	image.className = 'card-image'

	img = document.createElement('img')
	img.src = imagePath
	
	if(mobile)
		img.height = '450';
	else
		img.height = '200';

	title = document.createElement('span')
	title.className = 'card-title'
	title.innerText = monthsName[monthNumber]

	image.append(img)
	image.append(title)

	card.append(image)

	card.append(createMonth(4, monthNumber))

	return card
}

function createMonth(firstDay, monthNumber)
{
	month = document.createElement('table')


	dayRow = document.createElement('tr')
	dayRow.class = 'header'
	dayRow.innerHTML = '<td class="header">Пн</td><td class="header">Вт</td><td class="header">Ср</td><td class="header">Чт</td><td class="header">Пт</td><td class="header">Сб</td><td class="header">Вс</td>'
	dayRow.style.background = '#fff'

	month.append(dayRow)

	calendarRow = document.createElement('tr')
	
	var k = 0
	
	for(k = 1; k < startDays[monthNumber];k++)
	{
		day = document.createElement('td')
		day.className = 'calendarCell'
		calendarRow.append(day)
	}

	for(i = 1; i <= daysCount[monthNumber];i++,k++)
	{
		date = new Date(0)
		date.setYear(2019)
		date.setMonth(monthNumber)
		date.setHours(24 * (i-1))

		day = document.createElement('td')
		day.className = 'calendarCell'

		a = document.createElement('a')
		a.className = 'waves-effect waves-light btn'
		a.setAttribute('id', parseInt(date.getTime() / 1000))
		a.setAttribute('onclick', 'dayClick()')
		a.style.width = '100%'
		a.style.background = '#ff9800'

		if(i <= 9)
		a.innerText = '0' + i.toString()
		else
		a.innerText = i

		day.append(a)

		calendarRow.append(day)

		if((k % 7) == 0)
		{
			month.append(calendarRow)
			calendarRow = document.createElement('tr')
		}
	}
	month.append(calendarRow)

	return month
}

function resize()
{
	if(window.screen.width != currentWidth)
	{
		currentWidth = window.screen.width
		nextCalendar()
	}
	
	setInterval(resize,100)
}
