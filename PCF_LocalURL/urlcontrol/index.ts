import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class OpenLocalFile implements ComponentFramework.StandardControl<IInputs, IOutputs> {
	// Value of the field is stored and used inside the control 
	private _value: string;
	// label element created as part of this control
	private label: HTMLInputElement;
	// button element created as part of this control
	private button: HTMLButtonElement;
	// This element contains all elements of our custom control example
	private _container: HTMLDivElement;
	//set the context
	private _context: ComponentFramework.Context<IInputs>;
	/**
	 * Empty constructor.
	 */
	constructor() {

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement) {
		
		// Creating the label for the control and setting the relevant values.
		this.label = document.createElement("input");
		this.label.setAttribute("type", "label");
		this._context = context;
		this._value = this.label.value

		//Create a button to open the file.
		this.button = document.createElement("button");

		// Get the localized string from localized string 
		this.button.innerHTML = context.resources.getString("URLControl_ButtonLabel");
		this.button.classList.add("Simple_Button_Style");
		this.button.addEventListener("click", this.onButtonClick.bind(this));
		
		// Adding the label and button created to the container DIV.
		this._container = document.createElement("div");
		this._container.appendChild(this.label);
		this._container.appendChild(this.button);
		container.appendChild(this._container);

	}

	private onButtonClick(event: Event): void {
		this._context.navigation.openUrl(this.label.value);
	}

	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void {
		this._context = context;
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs {
		return {};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void {
		// Add code to cleanup control if necessary
	}
}