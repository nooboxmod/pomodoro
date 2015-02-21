window.onload = function() {
	var language = getItem("pomodoro_language", "en");
	
	var timer_pomodoro = parseInt(getItem("pomodoro_timer_pomodoro", (25).toString())) * 60;
	var timer_break = parseInt(getItem("pomodoro_timer_break", (5).toString())) * 60;
	var timer_longbreak = parseInt(getItem("pomodoro_timer_longbreak", (20).toString())) * 60;

	$("#pomodoro_timer").val(getItem("pomodoro_timer_pomodoro", (25).toString()));
	$("#play_timer").val(getItem("pomodoro_timer_break", (5).toString()));
	$("#longbreak_timer").val(getItem("pomodoro_timer_longbreak", (20).toString()));

	var current_pomodoro = 1;
	var current_break = 1;
	var current_longbreak = 1;
	
	var current_timer = timer_pomodoro;
	var current_step = 'p'; // p pomodoro, b break, l longbreak

	var going = false;

	var show_fullscreen = true;

	var has_storage = (typeof(Storage) !== "undefined");

	setInterval(updateTime, 1000);

	function getCurrentStepName(){
		if (getLanguage == "en"){
			if (current_step == "p")
				return "Pomodoro";
			else if (current_step == "b")
				return "Break";
			else if (current_step == "l")
				return "Long break";
		}else{
			if (current_step == "p")
				return "Pomodoro";
			else if (current_step == "b")
				return "Pausa";
			else if (current_step == "l")
				return "Pausa longa";
		}

	}

	function updateTime() {
		if (going){
			label = "";

			if (getLanguage == "en"){
				if (current_step == "p")
					label = "Pomodoro (" + current_pomodoro + "):";
				else if (current_step == "b")
					label = "Break:";
				else if (current_step == "l")
					label = "Long break:";
			}else{
				if (current_step == "p")
					label = "Pomodoro (" + current_pomodoro + "):";
				else if (current_step == "b")
					label = "Pausa:";
				else if (current_step == "l")
					label = "Pausa longa:";			
			}

			if (current_timer % 60 < 10)
				timer = (Math.floor(current_timer / 60)).toString() + ":0" + (current_timer % 60).toString();
			else
				timer = (Math.floor(current_timer / 60)).toString() + ":" + (current_timer % 60).toString();

			document.title = timer + " - " +  getCurrentStepName()

			$("#show_time").html(label + " " + timer);

			$("#show_time").html(label + " " + timer);

			current_timer -= 1;

			if (current_timer == 0){
				nextStep();
			}

			if (getLanguage() == "en"){
				if (current_step == "p"){
					$(".message").html("Now is time for work. Don't give up and keep your focus.")
				}else if (current_step == "b"){
					$(".message").html("Break. Try to relax and not work for now.");
				}else{
					$(".message").html("Now is time to relax. Try do anything for relax your mind. <br> Tip: stretch a little.");
				}
			}else{
				if (current_step == "p"){
					$(".message").html("Agora é hora de trabalhar. Não desista e tente manter o foco.")
				}else if (current_step == "b"){
					$(".message").html("Pausa. Tente relaxar e não trabalhe por enquanto.");
				}else{
					$(".message").html("Agora é hora de relaxar. Tente fazer qualquer coisa para relaxar a mente. <br> Dica: alongue-se um pouco.");
				}
			}
			if (current_step == "p" && show_fullscreen){
				$("#full-page").show();
			}else{
				$("#full-page").hide();
			}

		}
	}

	$("#full-page").live('click', function(e) {
		$("#full-page").hide();
		show_fullscreen = false;
	});
	
	$("#show_timer").live('click', function(e) {
		$("#full-page").show();
		show_fullscreen = true;
	});

	function nextStep () {
		if (current_step == 'p'){
			if (current_pomodoro % 4 == 0){
				current_step = "l";
				current_timer = timer_longbreak;
			}else{
				current_step = "b";
				current_timer = timer_break;
			}

			current_pomodoro ++;
		}else{
			if (current_step == "l")
				current_longbreak ++;
			else
				current_break ++;

			current_step = "p";
			current_timer = timer_pomodoro;
		}

		if (getLanguage() == "en"){
			if (current_step == "p"){
				$(".message").html("Now is time for work. Don't give up and keep your focus.");
			}else if (current_step == "b"){
				$(".message").html("Break. Try to relax and not work for now.");
			}else{
				$(".message").html("Now is time to relax. Try do anything for relax your mind. <br> Tip: stretch a little.");
			}
		}else{
			if (current_step == "p"){
				$(".message").html("Agora é hora de trabalhar. Não desista e tente manter o foco.");
			}else if (current_step == "b"){
				$(".message").html("Pausa. Tente relaxar e não trabalhe por enquanto.");
			}else{
				$(".message").html("Agora é hora de relaxar. Tente fazer qualquer coisa para relaxar a mente. <br> Dica: alongue-se um pouco.");
			}
		}
	}

	$("#play").live('click', function(e) {
		going = !going;

		if (getLanguage() == "en"){
			if (going)
				$("#play").html("Pause");
			else
				$("#play").html("Play");
		}else{
			if (going)
				$("#play").html("Pausar");
			else
				$("#play").html("Começar");
		}
	});

	$("#stop").live('click', function(e) {
		current_pomodoro = 1;
		current_break = 1;
		current_longbreak = 1;

		current_timer = timer_pomodoro;
		current_step = 'p';

		if (current_timer % 60 < 10)
			timer = (Math.floor(current_timer / 60)).toString() + ":0" + (current_timer % 60).toString();
		else
			timer = (Math.floor(current_timer / 60)).toString() + ":" + (current_timer % 60).toString();

		if (getLanguage() == "en")
			$("#play").html("Play");
		else
			$("#play").html("Começar");
		
		$("#show_timer").html("Pomodoro: " + timer);

		going = false;
	});

	$("#goto_pomodoro").live('click', function(e) {
		$("#home-page").show();
		$("#config-page").hide();
		$("#about-page").hide();

		$("#goto_settings").removeClass('selected');
		$("#goto_infos").removeClass('selected');
		$("#goto_pomodoro").addClass('selected');

		setLanguage("");
	});

	$("#goto_settings").live('click', function(e) {
		$("#config-page").show();
		$("#home-page").hide();
		$("#about-page").hide();

		$("#goto_settings").addClass('selected');
		$("#goto_pomodoro").removeClass('selected');
		$("#goto_infos").removeClass('selected');

		setLanguage("");
	});

	$("#goto_infos").live('click', function(e) {
		$("#config-page").hide();
		$("#home-page").hide();
		$("#about-page").show();

		$("#goto_settings").removeClass('selected');
		$("#goto_pomodoro").removeClass('selected');
		$("#goto_infos").addClass('selected');

		if (getLanguage() == "en"){
			$("#infos_pt").hide();
			$("#infos_en").show();
		}else{
			$("#infos_pt").show();
			$("#infos_en").hide();
		}

		setLanguage("");
	});


	$("#language_brazil").live('click', function(e) {
		$("#language_eua").removeClass('selected');
		$("#language_brazil").addClass('selected');

		setLanguage("pt");
	});

	$("#language_eua").live('click', function(e) {
		$("#language_brazil").removeClass('selected');
		$("#language_eua").addClass('selected');

		setLanguage("en");
	});

	function setLanguage (lang) {

		if (lang != "")
			language = lang;

		localStorage.setItem("pomodoro_language", language);

		if (language == "pt"){
			$("#language_eua").removeClass('selected');
			$("#language_brazil").addClass('selected');

			$("#label_time").html("Tempo (minutos):");
			$("#label_break").html("Pausa:");
			$("#label_longbreak").html("Pausa longa:");
			$("#save").html("Salvar");
			$("#label_language").html("Idioma:");
			$(".longtext").html("<div id='title'>O que é o Pomodoro</div><div id='sobre'>A <strong>Técnica Pomodoro</strong> é um método de gerenciamento de tempo desenvolvido por Francesco Cirillo no final dos anos 1980. A técnica utiliza um cronômetro para dividir o trabalho em períodos de 25 minutos chamados de 'pomodoros'.<br><p><strong>O método é baseado na ideia de que pausas frequentes podem aumentar a agilidade mental</strong> e busca fornecer uma resposta eficaz a um estado provocador de ansiedade chamado de <em>temporal 'becoming'</em> nos trabalhos de Henri Bergson e Eugene Minkowski.</p><br><p>Embora a técnica Pomodoro seja extremamente simples e fácil, ela não   deve ser usada simplesmente como um processo de acelerar o   desenvolvimento da tarefa, mas sim como uma unidade de esforço temporal   além do poder que ela tem de focar na tarefa, evitando distrações.   Portanto, além de você descobrir ao longo do tempo quais são as   atividades em que você seja menos produtivo, você poderá tentar se   desenvolver melhor nesses seus pontos mais fracos. São somente cinco os   passos básicos para implementar essa técnica</p><br><ol><li>Escolher a tarefa a ser executada</li><li>Ajustar o pomodoro (alarme) para 25 minutos</li><li>Trabalhar na tarefa até que o alarme toque; registrar com um 'x'</li><li>Fazer uma pausa curta (3 a 5 minutos)</li><li>A cada quatro 'pomodoros' fazer uma pausa mais longa (15-30 minutos)</li></ol></div>");
			$("#label_save").html("Salvar");

			if (!going)
				$("#play").html("Começar");
			else
				$("#play").html("Pausar");
			$("#stop").html("Parar");
		}else{
			$("#language_brazil").removeClass('selected');
			$("#language_eua").addClass('selected');

			$("#label_time").html("Time (minutes):");
			$("#label_break").html("Break:");
			$("#label_longbreak").html("Longbreak:");
			$("#save").html("Save");
			$("#label_language").html("Language:");
			$(".longtext").html("<div id='title'>What is Pomodoro</div><div id='sobre'>The <strong> Pomodoro Technique </strong> is a time management method developed by Francesco Cirillo in the late 1980. The technique uses a timer to divide the work in periods of 25 minutes called 'pomodoros'. Filmography <p> <strong> The method is based the idea that frequent breaks can increase mental alertness </strong> and seeks to provide an effective response to a provocative state of anxiety called <em> Secular 'Becoming' </em> in the work of Henri Bergson and Eugene Minkowski. </p> Filmography <p> Although the Pomodoro technique is extremely simple and easy, it should not be used simply as a process to speed up the development of the task, but as a temporal unit of effort beyond the power she has to focus on the task and avoid distractions. So besides you discover over time what are the activities in which you are less productive, you can try to develop better in these weakest points. Are only five basic steps to implement this technique </p> Filmography <ol> <li> Select the task to be performed </li> <li> Set the pomodoro (alarm) for 25 minutes </li> <li> Work on the task until the alarm to sound; register with an 'x' </li> <li> Take a short break (3-5 minutes) </li> <li> Every four 'pomodoros' make a longer break (15-30 minutes) </li> </ol> </div>");
			$("#label_save").html("Save");

			if (!going)
				$("#play").html("Play");
			else
				$("#play").html("Pause");
			$("#stop").html("Stop");
		}
	}

	function getItem(name, default_value){
		if (localStorage.getItem(name))
			return localStorage.getItem(name);
		else
			localStorage.setItem(name, default_value);

		return default_value;
	}

	function getLanguage(){
		return getItem("pomodoro_language", "en");
	}

	$("#save").live('click', function(e) {
		localStorage.setItem("pomodoro_timer_pomodoro", $("#pomodoro_timer").val());
		localStorage.setItem("pomodoro_timer_break", $("#play_timer").val());
		localStorage.setItem("pomodoro_timer_longbreak", $("#longbreak_timer").val());

		if (getLanguage() == "en")
			alert("Settings saved. It'll make effect the next time you open the app");
		else
			alert("Configurações salvas. Fará efeito na próxima vez que o app for aberto.");
	});

	$("#full-page").hide();
	$("#config-page").hide();
	$("#about-page").hide();
	setLanguage("");
}