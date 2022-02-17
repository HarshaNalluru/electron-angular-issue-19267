import { WindowApiConst } from 'shared-lib';
import { AbstractService } from './abstract-service';

import { AppConfigurationClient } from '@azure/app-configuration';

async function listSettings(prefix: string) {
	const connectionString = '<connection-string>';
	const client = new AppConfigurationClient(connectionString);
	const sampleKeys = client.listConfigurationSettings({
		keyFilter: `${prefix}*`,
	});
	const settings = [];
	for await (const setting of sampleKeys) {
		console.log(`  Found key: ${setting.key}, label: ${setting.label}`);
		settings.push(`  Found key: ${setting.key}, label: ${setting.label}`);
	}
	return settings;
}

export class MultiplesService extends AbstractService<
	string,
	Promise<string[]>
> {
	receptionChannel(): string {
		return WindowApiConst.MULTIPLES_INPUT;
	}

	sendingChannel(): string {
		return WindowApiConst.MULTIPLES_OUTPUT;
	}

	async process(input: string): Promise<string[]> {
		return listSettings(input);
	}
}
