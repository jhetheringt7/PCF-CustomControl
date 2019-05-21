import {IInputs, IOutputs} from "./generated/ManifestTypes";

export class postcodeValidation implements ComponentFramework.StandardControl<IInputs, IOutputs> {


	// label element created as part of this control
	private label: HTMLInputElement;
	// button element created as part of this control
	private button: HTMLButtonElement;
	// This element contains all elements of our custom control example
	private _container: HTMLDivElement;
	//set the context
	private _context: ComponentFramework.Context<IInputs>;


	private _value: string;
	/**
	 * Empty constructor.
	 */
	constructor()
	{

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='starndard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		// Add control initialization code

		// Creating the label for the control and setting the relevant values.
		this.label = document.createElement("input");
		this.label.setAttribute("type", "label");
		this._context = context;
		this.label.addEventListener('keyup', this.onKeyUp.bind(this));
		
		// Adding the label and button created to the container DIV.
		this._container = document.createElement("div");
		this._container.appendChild(this.label);
		container.appendChild(this._container);

	}

	private sendValues(event: Event): void {

	}

	private onKeyUp(event: Event): void {
		this._value = this.label.value;

		if (this._value != ""){

		const https = require('https');

			https.get('https://api.postcodes.io/postcodes/' + this._value + '/validate', (resp: any) => {
			  let data = '';
			
			  // A chunk of data has been recieved.
			  resp.on('data', (chunk: any) => {
				data += chunk;
			  });
			
			  // The whole response has been received. Print out the result.
			  resp.on('end', () => {
				var response = JSON.parse(data);

				if (response.result == true) {
					this.label.classList.add("Valid_Button_Style");
					this.label.classList.remove("Invalid_Button_Style");
				}
				else if (response.result == false){
					this.label.classList.add("Invalid_Button_Style");
					this.label.classList.remove("Valid_Button_Style");
				}
				
			  });
			
			}).on("error", (err: { message: string; }) => {
			  console.log("Error: " + err.message);
			});
		} else {
			this.label.classList.remove("Invalid_Button_Style");
			this.label.classList.remove("Valid_Button_Style");
		}

	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		// Add code to update control view
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
	}
}