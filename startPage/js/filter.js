currentEventList = []
currentSelectedEvents = []

function fillCountriesList(countries)
{
	for(i = 0; i < countries.length;i++)
	{
		ligues[countries[i]] = allEvents[0].filter(x => x.tourID.split('.')[1] == countries[i])
		tournaments[countries[i]] = allEvents[0].filter(x => x.tourID.split('.')[2] == countries[i])
		item = document.createElement('option')
		item.setAttribute('value', i + 1)
		item.setAttribute.className = 'country'
		item.innerText = countries[i]
		item.addEventListener('click',countryChanged)
		countriesDD.append(item)
	}
}

function refreshSelect()
{
	var elems = document.querySelectorAll('select');
	var instances = M.FormSelect.init(elems, '');
}

function refreshEvents()
{
	var elems = document.getElementById('eventsDD');
	var instances = M.FormSelect.init(elems, '');
}

function updateEvents()
{
	list = document.getElementsByClassName('dropdown-content select-dropdown multiple-select-dropdown')
	
	selectedItems = Array.prototype.slice.call(list[1].children).filter(x => x.classList == 'selected')
	
	selectedItems
	
	if(selectedItems.every((x,i) => x == currentSelectedEvents[i]) && currentSelectedEvents.every((x,i) => x == selectedItems[i]))
		return;
	
	currentSelectedEvents = selectedItems
	
	selectedEvents = []
	selectedTeams = []
	
	selectedItems.forEach(function(element) {
	  console.log(element);
				  
	  selectedTeams = selectedTeams.concat(allEvents[0].filter(x => x.tourID.indexOf(element.innerText) > -1))
	});
	
	showEvents(selectedTeams,1)
}

function updateTournaments()
{
	list = document.getElementsByClassName('dropdown-content select-dropdown multiple-select-dropdown')
	
	selectedItems = Array.prototype.slice.call(list[0].children).filter(x => x.classList == 'selected')
	selectedTournaments = []
	
	selectedItems.forEach(function(element) {
	  console.log(element);
				  
	  selectedTournaments = selectedTournaments.concat(ligues[' ' + element.innerText.replace(' ','')])
	  
	  });
	  
	  if((currentEventList.every((x,i)=> x != selectedTournaments[i]) && (currentEventList.length != 0)) || (currentEventList.length != selectedTournaments.length))
	  {
	  
		currentEventList = selectedTournaments
		eventsDD = document.getElementById('eventsDD')
		eventsDD.innerHTML = ''

		selectedTournaments = Array.from(new Set(selectedTournaments.map(x => x.tourID)))
		
		for(i = 0; i < selectedTournaments.length;i++)
		{
			item = document.createElement('option')
			item.setAttribute('value', i + 1)
			item.innerText = selectedTournaments[i]
			eventsDD.append(item)
		}
	  
		refreshEvents()
	  }
	  
	  return 
	  
	  if((currentEventList.every((x,i)=> x != selectedTournaments[i]) && (currentEventList.length != 0)) || (currentEventList.length != selectedTournaments.length))
	  {
	  
		currentEventList = selectedTournaments
		eventsDD = document.getElementById('eventsDD')
		eventsDD.innerHTML = ''

		for(i = 0; i < selectedTournaments.length;i++)
		{
			item = document.createElement('option')
			item.setAttribute('value', i + 1)
			item.innerText = selectedTournaments[i].team1 + ':' + selectedTournaments[i].team2
			eventsDD.append(item)
		}
	  
		refreshEvents()
	  }


	console.log('Update')
}